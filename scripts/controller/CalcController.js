class CalcControler {
    /**
     * Inicializa meus Atributos e Metodos
     */
    constructor(){
        /**
         * '_' - "Cria um atributo privado"
         */
        this._audio =  new Audio('click.mp3'); 
        this._audioOnOff = false;
        this._lastOperator = "";
        this._lastNumber ="";
        this._operation = [];
        this._locale =  "pt-BR"; 
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._TimeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initiButtonEvents();
        this.initKeyboard();
        this.pasteFromClipboard();
    
    }

    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let text =  e.clipboardData.getData('Text');
            this.displayCalc =  parseFloat(text);
            console.log(text);
        })
    }
    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.displayCalc
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
    }
    /**
     * Incialização
     */
    initialize(){

            this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        },1000)
        
        this.setLastNumberToDisplay();
        this.pasteFromClipboard();


        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick',e=>{
                this.toggleAudio();
            })
        })

    }

    toggleAudio(){
        this._audioOnOff = !this._audioOnOff
    }

    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }


    initKeyboard(){
        document.addEventListener('keyup', e=>{
            this.playAudio();
            switch(e.key){
                case "Escape":
                    this.clearAll();
                    break;
                case "Backspace":
                    this.clearEntry();
                    break;
                case "+":
                case '-':
                case '*':
                case '/':
                case '%':
                this.addOperation(e.key)
                 
                    break;
                case "Enter":
                case "=":
                    this.calc();
                    break;
                case ".":
                case ",":
                this.addDot()
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
                    this.addOperation(parseInt(e.key))
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                break;
               
            }
        });
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
    /**
     * Limpa toda a operação
     */
    clearAll(){
        this._operation = [];
        this._lastOperator = "";
        this._lastNumber = "";
        this.setLastNumberToDisplay();
    }
    /**
     * Limpa a ulitma entrada
     */
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    /**
     * retorna o ultimo numero ou operador clicado
     */
    getLastOperation(){
        return this._operation[this._operation.length-1]
        
    }
    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }
    /**
     * 
     * @param {valida de se é um Operador} value 
     */
    isOperator(value){
        return (["+","-","*","%","/"].indexOf(value)> -1);
          
    }
    /**
     * 
     * @param {*} value 
     */
    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3){

            this.calc();
            console.log(this._operation)
        }
    }
    /**
     * executa o calculo
     */
    getResult(){
        
        try{
            return eval(this._operation.join(""));
        
        }catch(e){
            setTimeout(()=>{
                this.setError();
            }, 1)
            
        }
    }

    /**
     * Faz o caulculo
     */
    calc(){
        let last = '';
        this._lastOperator = this.getLastItem();
        
        if(this._operation.length < 3 ){
            let firstItem =  this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }
        
        if(this._operation.length > 3){
            //last recebe o ultimo array
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }else if(this._operation.length == 3){
            
            this._lastNumber = this.getLastItem(false);
        }
        
        console.log('lastNumber = '+ this._lastNumber)
        console.log('lastOperator = '+ this._lastOperator)
        //eval executa um comando passado por string
        //join(separador) - junta arrays numa string
        let result = this.getResult();
        
        if(last == "%"){
            result /= 100;
            this._operation = [result]
        }else{
        
            this._operation = [result]
            if(last)this._operation.push(last);
        }
        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){
        let  lastItem;
        
        
        
        for(let i =this._operation.length-1; i >= 0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }
            
        }

        if(!lastItem){
            lastItem = (isOperator)? this._lastOperator:this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay(){
        let  lastNumber = this.getLastItem(false);
    
        if(!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }
    /**
     * 
     * @param {Junta as operacao} value 
     */
    addOperation(value){
        
        //Pega o ultimo operador e veref
        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                //Trocar o Operador
                this.setLastOperation(value);
            }else if(isNaN(value)){
                //Outra coisa
                console.log('outra coisa');
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        }else{

            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
            //Numero
                let newValue =  this.getLastOperation().toString() + value.toString();
                this.setLastOperation((newValue));

                this.setLastNumberToDisplay();

            }
        }
        
        //console.log(this._operation);
        
    }

    setError(){
        this.displayCalc = "Error";
    }

    addDot(){
        let lastOperation =  this.getLastOperation();
        if(typeof lastOperation ==='string' && lastOperation.split('').indexOf('.') > -1) return;
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.')
        }else{
            this.setLastOperation(lastOperation.toString()+ '.');
        }
        this.setLastNumberToDisplay();
    }

    execBtn(value){
        this.playAudio()
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
                this.calc();
                break;
            case "ponto":
            this.addDot()
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
        if(value.toString().length > 10){
            this.setError();
            return false;
        }
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}