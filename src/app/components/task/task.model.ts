export class Task {
   public _id!: string;
//    public user_id: string;
   public title: string;
   public desc: string;
   public due_date: Date;
   public status: string;

   constructor(
    title: string,
    desc: string,
    due_date: Date,status: string){
       ;
        this.title = title;
        this.desc = desc;
        this.due_date = due_date;
        this.status = status;
  }
}