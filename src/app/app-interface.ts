export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
  }
  
export  interface TokenResponse {
    token: string;
  }
  
export interface TokenPayLoad {
    username: string;
    password: string;
    name?: string;
  }

export class Reason {
  
  reason: string;
  type: string;

}

export class TeacherList {

  _id: string;
  teacherName: string;
  isParts: boolean;
  isTime: boolean;
  type: string;
  reason: string;
  part: string;
  inTime: string;
  outTime: string;
  reasonObj: Reason

}

export class AdjustmentShow {

  class: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  percentage: number;

}


export class AdjustmentSend {

  _id: string;
  reason: string;
  type: string;
  startTime: string;
  endTime: string;

}

export class EditTeachers {

  _id: string;
  teacherName: string;
  reason: string;
  type: string;
  startTime: string;
  endTime: string;
  status: string;

}

export class AdjustmentRecieve {

  class: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  percentage: number;
  previousId: string;
  previousTeacherName: string; 

}

export class PreviousAdjustmentResponse {

  absentList: EditTeachers[];
  adjustmentList: AdjustmentRecieve[];
  date: string;
  dayOfWeek: number;
  exceptionList: EditTeachers[];
  failedAdjustmentList: AdjustmentRecieve[];
  username: string;

}


export class SendEditedAdjustments {

  editAbsentList: EditTeachers[];
  addAbsentList: AdjustmentSend[];
  addExceptionList: AdjustmentSend[];
  editExceptionList: EditTeachers[]; 

}