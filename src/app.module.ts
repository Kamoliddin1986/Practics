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
import { Stuff } from './stuff/models/stuff.model';
import { StuffGroup } from './stuff_group/models/stuff_group.model';
import { Group } from './group/models/group.model';
import { Student } from './students/models/student.model';
import { StuffRole } from './stuff_role/models/stuff_role.model';
import { Role } from './role/models/role.model';
import { StuffSubject } from './stuff_subjects/models/stuff_subject.model';
import { Subject } from './subjects/models/subject.model';
import { TestGroup } from './test_group/models/test_group.model';
import { TestResult } from './test_results/models/test_result.model';
import { Question } from './questions/models/question.model';
import { ResultDetail } from './result_detail/models/result_detail.model';
import { Answer } from './answers/models/answer.model';


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
      models:[Stuff,StuffGroup,Group,Student,StuffRole,Role,StuffSubject,Subject,TestGroup,TestResult,Question,ResultDetail,Answer],
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
