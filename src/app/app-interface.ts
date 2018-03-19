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

export interface TeacherList {

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

export interface AdjustmentShow {

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

export class AdjustmentRecieve {

  class: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  percentage: number;

}