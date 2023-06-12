import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StuffModule } from './stuff/stuff.module';
import { StuffGroupModule } from './stuff_group/stuff_group.module';
import { GroupModule } from './group/group.module';
import { StudentsModule } from './students/students.module';
import { StuffRoleModule } from './stuff_role/stuff_role.module';
import { RoleModule } from './role/role.module';
import { StuffSubjectsModule } from './stuff_subjects/stuff_subjects.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TestGroupModule } from './test_group/test_group.module';
import { TestResultsModule } from './test_results/test_results.module';
import { QuestionsModule } from './questions/questions.module';
import { ResultDetailModule } from './result_detail/result_detail.module';
import { AnswersModule } from './answers/answers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models:[],
      autoLoadModels: true,
      logging: true
    }),
    StuffModule,
    StuffGroupModule,
    GroupModule,
    StudentsModule,
    StuffRoleModule,
    RoleModule,
    StuffSubjectsModule,
    SubjectsModule,
    TestGroupModule,
    TestResultsModule,
    QuestionsModule,
    ResultDetailModule,
    AnswersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
