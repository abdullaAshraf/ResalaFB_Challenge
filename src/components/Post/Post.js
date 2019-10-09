class Post {
    link;
    content;
    category;
    createDate;
    editDate;
    deleted = false;
    seen = false;
    working = false;
    notes = [];
    assignedRoles = [];

    constructor (link,content,category,date){
        this.link = link;
        this.content = content;
        this.category = category;
        this.createDate = this.editDate = date;
        this.deleted = false
        this.seen = false;
        this.working = false;
        this.notes = [];
        this.assignedRoles = [];
    }

    getShortContent = () => {
        const shortLimit = 50;
        return this.content.length < shortLimit ? this.content : this.content.substring(0,shortLimit)+"...";
    }

    getEditDate = () => {
        return this.getFormatedDate(this.editDate);
    }

    getCreateDate = () => {
        return this.getFormatedDate(this.createDate);
    }

    getFormatedDate = (date) => {
        date = new Date(date);
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return formatted_date;
    }
}

export default Post;