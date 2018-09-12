class CalcControler {
    /**
     * Inicializa meus Atributos e Metodos
     */
    constructor(){
        /**
         * '_' - "Cria um atributo privado"
         */
        this._operation = [];
        this._locale =  "pt-BR"; 
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._TimeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initiButtonEvents();
    }
    /**
     * Incialização
     */
    initialize(){

            this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000)
        
        
    }
    /**
     * Funcao para aplicar varios eventos
     * @param {*Determinar quais eventos devem ser aplicado} events 
     * @param {*Determinar o elemento a qual sera aplicado} element 
     * @param {*Funcao que sera executado no elemento} fn 
     */
    addEventListenerAll(events, element, fn){

        events.split(' ').forEach(event => {
            element.addEventListener(event,fn, false);
        })

    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    getLastOperator(){
        return this._operation[this._operation.length-1]
    }
    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }
    isOperator(value){
        return (["+","-","*","%","/"].indexOf(value)> -1);
          
    }
    addOperation(value){
        
        console.log(value,this.getLastOperator());
        if(isNaN(this.getLastOperator())){
            //String
            if(this.isOperator(value)){
                //Trocar o Operador
                this.setLastOperation(value);
            }else if(isNaN(value)){
                //Outra coisa
                console.log(valor);
            }else{
                this._operation.push(value);
            }
        }else{

            if(this.isOperator(value)){
                this._operation.push(value);
            }else{
            //Numero
                let newValue =  this.getLastOperator().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
            }
        }
        
        console.log(this._operation);
        
    }

    

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){
        switch(value){
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation('+')
                break;
            case "subtracao":
                this.addOperation('-')
                break;
            case "multiplicacao":
                this.addOperation('*')
                break;
            case "divisao":
                this.addOperation('/')
                break;
            case "porcento":
                this.addOperation('%')
                break;
            case "igual":
            
                break;
            case "ponto":
            this.addOperation('.')
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;
           default:
                this.setError();
                break;
        }
    }

    /**
     * Inicializa os Eventos do botão
     */
    initiButtonEvents(){
        
        //Captura todos os elementos buttons
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");;
        //Percorre todos os elementos encontrados 
        buttons.forEach((btn,index)=>{
            //Aplica os eventos que eu quero que seja efetuado
            this.addEventListenerAll('click drag',btn, e =>{
                
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);

            });
            //Muda o ponteiro em todos os eventos
            this.addEventListenerAll("mouseover mouseup mousedown",btn, e => {
                btn.style.cursor = "pointer";
            });   
        });
    }

    
    /**
     * Exibe na tela a Hora
     */
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day:    "2-digit",
            month:  "long",
            year:   "numeric"

        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }


    /**
     * Captura o valor da Hora
     */

    get displayTime(){
       return this._TimeEl.innerHTML
    }
    /**
     * Atribuie Valor da Hora
     */
    set displayTime(value){
       return this._TimeEl.innerHTML = value
    }
    /**
     * Captura Valor da Data
     */
    get displayDate(){
        return this._dateEl.innerHTML 
    }
    /**
     * Atribuie Valor da Hora
     */
    set displayDate(value){
        return this._dateEl.innerHTML = value
    }
     /**
     * Captura Valor do Display
     */
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
     /**
     * Atribuie Valor do Display
     */
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}