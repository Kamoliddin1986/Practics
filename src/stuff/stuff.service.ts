import { StuffRoleModule } from './../stuff_role/stuff_role.module';
import { JwtService } from '@nestjs/jwt';
import { StuffRoleService } from './../stuff_role/stuff_role.service';
import { AddRoleDto } from './dto/Add-role.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateAnswerDto } from './../answers/dto/update-answer.dto';
import { log } from 'console';
import { Role } from './../role/models/role.model';
import { StuffRole } from './../stuff_role/models/stuff_role.model';
import { CreateStuffByAdminDto } from './dto/create-stuff-by_admin.dto';
import { Stuff } from './models/stuff.model';
import { Injectable,BadRequestException, Inject, forwardRef  } from '@nestjs/common';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { InjectModel } from "@nestjs/Sequelize";
import * as bcrypt from 'bcryptjs';
import { RoleService } from '../role/role.service';
import { StuffLoginDto } from './dto/login.dto';
import { RoleModule } from '../role/role.module';

@Injectable()
export class StuffService {
  constructor(
  @InjectModel(Stuff) private StuffRepo: typeof Stuff,
   private roleService: RoleService,
  @Inject(forwardRef(()=> StuffRoleService)) 
  private  stuffRoleService: StuffRoleService,
  private  jwtService: JwtService
  
  ) {}


  async createStuffByAdmin(createStuffByAdminDto: CreateStuffByAdminDto) {

    const {first_name, last_name, tel, email} = createStuffByAdminDto
    const login = first_name +'.'+ last_name
    const isExistStuff = await this.StuffRepo.findOne({where: {login}})
    const isExistTel = await this.StuffRepo.findOne({where: {tel}})
    const isExistEmail = await this.StuffRepo.findOne({where: {email}})
    
    if(isExistStuff){
      throw new BadRequestException("This user is exists!");
    }

    if(isExistTel || isExistEmail){
      throw new BadRequestException("Phone number or email exists");
    }


    const hashed_password = await bcrypt.hash(login,7)
    
    const newStuff = await this.StuffRepo.create({
      ...createStuffByAdminDto,
      login,
      hashed_password
    })
    
    const teacher_role = await this.roleService.findByName("o'qituvchi")
    
    
    console.log('Logiwwwn>>>>', teacher_role);
    const newStuffRole = await this.stuffRoleService.create({
      stuff_id: newStuff.id,
      role_id: teacher_role.id
    })

    console.log('Logiwwwn>>>><<<<', teacher_role);


    return {
      msg: "Staff registered",
      newStuff
    }
  }


  async updatePassword(id:number, updatePasswordDto: UpdatePasswordDto){
    const {oldPassword, newPassword, confirmPassword} = updatePasswordDto
    
    const stuff = await this.StuffRepo.findByPk(id, {include: {all: true}})
    
    
    const isOldPassTrue = await bcrypt.compare(oldPassword,stuff.hashed_password)
    if(!isOldPassTrue){
        throw new BadRequestException("Old password is not correct!");        
    }

    if(newPassword !== confirmPassword){
      throw new BadRequestException("please chack new password");
    }

    const hashed_password = await bcrypt.hash(newPassword,7)

    const updatedStuff = await this.StuffRepo.update(
      {hashed_password},
      {where: {id}, returning: true}) 
      

      return {
        msg: 'Password updated',
        updatedStuff
      }
    }

   
    
    async getToken(stuff: Stuff) {
      const roles = await this.stuffRoleService.findAllRoles(stuff.id)
      let roleStatus = 0
      let roleName =''
      roles.forEach(el => {
        if(el.roles.status>roleStatus){
          roleStatus = el.roles.status;
          roleName = el.roles.name
        }
      })
      const jwtPayload = {
        role: roleName,
        roleStatus,
        id: stuff.id,
        is_active: stuff.is_active,
      };
  
      const [accessToken, refreshToken] =await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME
        })
      ]);
      return {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    }
 

    async login(stuffLoginDto: StuffLoginDto) {
      const {login, password} = stuffLoginDto;
      const stuff = await this.StuffRepo.findOne({ where: {login}});
      if(!stuff) {
        throw new BadRequestException('Stuff is not registered!!');
      }
  
  
      const isMatchPass = await bcrypt.compare(password, stuff.hashed_password)
      if(!isMatchPass) {
        throw new BadRequestException('Stuff not registered(pass)!!');
      }
  
      const tokens = await this.getToken(stuff)
  
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
  
      const updateStuff = await this.StuffRepo.update({
        hashed_refresh_token},
       {where: {id: stuff.id}, returning: true}
      ) 
  
     
      let msg = 'stuff signed in'
     
    
      return {tokens,msg,updateStuff}
    }
 



    async active(id:number) {
      const activatedStuff = await this.StuffRepo.update({is_active: true}, {where: {id}, returning: true})
      return activatedStuff
    }

    async deActive(id:number) {
      const deActivatedStuff = await this.StuffRepo.update({is_active: false}, {where: {id}, returning: true})
      return deActivatedStuff
    }
 
    async findAll() {

    const verib = await this.StuffRepo.findAll({include:{all: true}})
    return verib
  }




  async findOne(id: number) {
    const verib = await this.StuffRepo.findByPk(id,{include:{all: true}})
    return verib
  }

  async update(id: number, updateStuffDto: UpdateStuffDto) {
    const verib = await this.StuffRepo.update(updateStuffDto, {where: {id}, returning: true})
    return verib
  }

  remove(id: number) {
    return this.StuffRepo.destroy({where: {id}})
  }

}