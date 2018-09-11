class CalcControler {
    
    constructor(){

        this._locale =  "pt-BR"; 
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._TimeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
    }
    initialize(){

            this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000)
        
        
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day:    "2-digit",
            month:  "long",
            year:   "numeric"

        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }




    get displayTime(){
       return this._TimeEl.innerHTML
    }
    set displayTime(value){
       return this._TimeEl.innerHTML = value
    }
    get displayDate(){
        return this._dateEl.innerHTML 
    }
    set displayDate(value){
        return this._dateEl.innerHTML = value
    }

    get displayCalc(){
        return this._displayCalc.innerHTML;
    }
    set displayCalc(value){
        this._displayCalc.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}