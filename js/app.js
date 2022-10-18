const DEFAULT_STATE = {
  state: true,
  inputName:'',
  names:[],
  error: '',
  showError: false,
  result:''
}

const app = Vue.createApp({
  data(){
    return {
      ...DEFAULT_STATE
    }
  },
  computed:{
    isReady(){
      return  this.names.length > 1;
    }
  },
  methods:{
    addNamesToList(){
      const userName = this.inputName;
      if(this.validate(userName)){
        this.names.push(userName);
        this.inputName = '';
        this.showError = false;
      } else {
        this.showError = true;
      }
    },
    validate(value){
      this.error = '';
      if (value === '') {
        this.error = 'No empty name';
        return false;
      }
      if(this.names.includes(value)) {
        this.error = 'No similar names';
        return false;
      }
      return true;
    },
    removeName(index){
      this.names.splice(index,1);
    },
    showResults(){
      this.generateResult();
      this.state = false;
    },
    getRandomName(){
      return this.names[Math.floor(Math.random() * this.names.length)]
    },
    generateResult(){
      let rand = this.getRandomName();
      if(this.result !== ''){
        while (rand === this.result) {
          rand = this.getRandomName();
        }
      }
      this.result = rand;
    },
    getNewResult(){
      this.generateResult();
    },
    resetApp(){
      this.state = true;
      this.inputName ='';
      this.names = [];
      this.error = '';
      this.showError = false;
      this.result = '';
    }
  }

}).mount('#app');