import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import * as bcrypt from 'bcryptjs';
import { UpdateStudentPasswordDto } from './dto/update-password.dto';
import { JwtService } from '@nestjs/jwt';
import { StudentLoginDto } from './dto/login.dto';
import { log } from 'console';


@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private StudentRepo: typeof Student,
    private readonly jwtService: JwtService
    ) {}
  
  
    async createStudentByAdmin(createStudentDto: CreateStudentDto) {
  
      const {first_name, last_name, phone_number, group_id} = createStudentDto
      const username = first_name +'.'+ last_name
      const isExistStudent = await this.StudentRepo.findOne({where: {username}})
      
      if(isExistStudent){
        throw new BadRequestException("This student is exists!");
      }
  
  
  
      const hashed_password = await bcrypt.hash(username,7)
      
      const newStudent = await this.StudentRepo.create({
        ...createStudentDto,
        username,
        hashed_password
      })
      
      return {
        newStudent,
        msg: "Student registered"
      }
    }
  
  
    async updatePassword(id:number, updateStudentPasswordDto: UpdateStudentPasswordDto){
      console.log("UPDATEPASSS>>>>>>>>");
      
      const {oldPassword, newPassword, confirmPassword} = updateStudentPasswordDto
      
      const student = await this.StudentRepo.findByPk(id, {include: {all: true}})
      
      
      const isOldPassTrue = await bcrypt.compare(oldPassword,student.hashed_password)
      if(!isOldPassTrue){
          throw new BadRequestException("Old password is not correct!");        
      }
  
      if(newPassword !== confirmPassword){
        throw new BadRequestException("please chack new password");
      }
      console.log("UPDate PSS>>>>", newPassword);
      
      const hashed_password = await bcrypt.hash(newPassword,7)
  
      const updatedStudent = await this.StudentRepo.update(
        {hashed_password},
        {where: {id}, returning: true}) 
        
  
        return {
          msg: 'Password updated',
          updatedStudent
        }
      }
  
  
    async getToken(student: Student) {
        const jwtPayload = {
          role: 'student',
          id: student.id,
          is_active: student.is_active,
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
   

    async login(studentLoginDto: StudentLoginDto) {
        const {username, password} = studentLoginDto;
        const student = await this.StudentRepo.findOne({ where: {username}});
        if(!student) {
          throw new BadRequestException('Student is not registered!!');
        }
    
    
        const isMatchPass = await bcrypt.compare(password, student.hashed_password)
        if(!isMatchPass) {
          throw new BadRequestException('Student not registered(pass)!!');
        }
    
        const tokens = await this.getToken(student)
    
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token,7)
    
        const updateStudent = await this.StudentRepo.update({
          hashed_refresh_token},
         {where: {id: student.id}, returning: true}
        ) 
    
       
        let msg = 'student signed in'
       
      
        return {tokens,msg,updateStudent}
      }
    
    async active(id:number) {
      const activatedStudent = await this.StudentRepo.update({is_active: true}, {where: {id}, returning: true})
      return activatedStudent
    }

    async deActive(id:number) {
      const deActivatedStudent = await this.StudentRepo.update({is_active: false}, {where: {id}, returning: true})
      return deActivatedStudent
    }



      async findAll() {
  
      const verib = await this.StudentRepo.findAll({include:{all: true}})
      return verib
    }
  
  
  
  
    async findOne(id: number) {
      const verib = await this.StudentRepo.findByPk(id,{include:{all: true}})
      return verib
    }
  
    async update(id: number, updateStudentDto: UpdateStudentDto) {
      const verib = await this.StudentRepo.update(updateStudentDto, {where: {id}, returning: true})
      return verib
    }
  
    remove(id: number) {
      return this.StudentRepo.destroy({where: {id}})
    }
}
