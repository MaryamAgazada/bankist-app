const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2023-03-26T17:01:17.194Z",
      "2023-03-27T23:36:17.929Z",
      "2023-03-28T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
  };
  
  const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  };
  const account3 = {
    owner: "Stewen Tomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 8500, -30],
    interestRate:0.7,
    pin: 3333,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  };
  const account4 = {
    owner: "Sarah Smith",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1,
    pin: 4444,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2023-03-20T14:43:26.374Z",
      "2023-03-27T18:49:59.371Z",
      "2023-03-28T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  };

  const accounts = [account1, account2,account3,account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//funcionality

const countDownTimer=()=>{
  let time=300;
  setInterval(()=>{
    let minute=String(Math.floor(time/60)).padStart(2,0)
    let second =String(Math.floor(time%60)).padStart(2,0)
    if(time>=0){
      time--;
      labelTimer.textContent=`${minute}:${second}`
    }
    if(time===0){
      currentAccount=undefined;
      containerApp.style.opacity=0;
      labelWelcome.textContent="Log in to get started"
    }
    
  },1000)
 
  
  }
 
const formatMovementsDate=(date)=>{
  const calcDaysPassed = (date1,date2) => {
    return Math.abs(date2-date1)/(1000*60*60*24)
    }
    const daysPassed = Math.round(calcDaysPassed(new Date(),date))
   
    if(daysPassed===0){
      return "today"
    }
    if(daysPassed===1){
      return "yesterday"
    }
    if(daysPassed<=7){
      return `${daysPassed} days ago`
    }
    // console.log(daysPassed)
  const year=date.getFullYear()
  const month=String(date.getMonth()+1).padStart(2,0)
  const day=String(date.getDate()).padStart(2,0)
  return `${day}/${month}/${year}`
}

const displayMovements=(acc,sort=false)=>{
    containerMovements.innerHTML=""
  // const movsClone=[...movs]
    // const sortedMovements=sort ? movsClone.sort((a,b)=>a-b) : movs
    const movements=sort ? acc.movements.slice().sort((a,b)=> a-b ): acc.movements
movements.forEach((mov,index)=>{
    const type= mov > 0 ? "deposit":"withdrawal"
    const date=new Date(acc.movementsDates[index]) 
    
    const displayDate= formatMovementsDate(date)
      const html=`<div class="movements__row">
      <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>`
    containerMovements.insertAdjacentHTML("afterbegin",html)
})
}

const createUserName=()=>{
    accounts.forEach(account=>{
        const user=account.owner;
        const userName=user.toLowerCase().split(" ").map((str)=>str[0]).join("")
         account.userName=userName
    })
    
// console.log(userName)
}



const calcDisplayBalance=(account)=>{
    const balance=account.movements.reduce((sum,mov)=>sum+mov,0)
    // labelBalance.textContent=`${balance.toFixed(2)}€`
    labelBalance.textContent=new Intl.NumberFormat(account.locale,{
      style:"currency",
      currency:account.currency
    }).format(balance)
    // account.balance=balance
   
}

const calcDisplaySummary=(movs)=>{
const deposits=movs.filter((mov)=>mov>0).reduce((total,deposit)=>total+deposit,0)
labelSumIn.textContent=`${deposits.toFixed(2)}€`

const outs=movs.filter((mov)=>mov<0).reduce((total,out)=>total+out,0)
labelSumOut.textContent=`${Math.abs(outs).toFixed(2)}€`


const interest=movs
.filter((mov)=>mov>0)
.map(deposit=>(deposit*1.2)/100)
.reduce((total,interest)=>total+interest,0)
labelSumInterest.textContent=`${interest}`


}

const updateUI =(acc)=>{
  displayMovements(acc)
  calcDisplaySummary(acc.movements)
  calcDisplayBalance(acc)
}


createUserName(accounts)


let currentAccount
// const today= new Date()
// const year=today.getFullYear()
// const month=String(today.getMonth()+1).padStart(2,0)
// const date=String(today.getDate()).padStart(2,0)
// const hour=today.getHours()
// const minute=today.getMinutes()
// // console.log(today)
// labelDate.textContent=`${date}/${month}/${year}, ${hour}:${minute}`



btnLogin.addEventListener("click",function(e){
e.preventDefault()
currentAccount=accounts.find(
  (account)=>account.userName===inputLoginUsername.value)
if(currentAccount && currentAccount.pin===+inputLoginPin.value){
  updateUI(currentAccount)
  containerApp.style.opacity=1;
  inputLoginPin.value=""
  inputLoginUsername.value=""
  inputLoginPin.blur();
  inputLoginUsername.blur()
  labelWelcome.textContent=`welcome back,${currentAccount.owner.split(" ")[0]}`
  labelDate.textContent= new Intl.DateTimeFormat(currentAccount.locale,{
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
    weekday:"long"

  }).format(new Date())
  
}
countDownTimer()
})

btnTransfer.addEventListener("click",function(e){
  e.preventDefault();
const amount=+inputTransferAmount.value;
const reciverAcc=accounts.find(
  (acc)=>inputTransferTo.value===acc.userName
)

// console.log(amount)

if(reciverAcc && 
  amount>0 &&
   currentAccount.balance>=amount && 
   currentAccount.userName !==reciverAcc.userName)
   {
currentAccount.movements.push(-amount)
currentAccount.movementsDates.push(new Date().toISOString())
recieverAccount.movementsDates.push(new Date().toISOString())

reciverAcc.movements.push(amount)
updateUI(currentAccount)
inputTransferAmount.value=""
inputTransferTo.value=""
// console.log("trensfer")
}
})

btnClose.addEventListener("click",function(e){
  e.preventDefault()
  const closeAcc=inputCloseUsername.value
  const closePin=+inputClosePin.value
const index=accounts.findIndex((acc)=>acc.userName===closeAcc)
console.log(index)
  if(closeAcc === currentAccount.userName &&
    closePin === currentAccount.pin){
accounts.splice(index,1)
containerApp.style.opacity=0
inputCloseUsername.value=""
inputClosePin.value=""

  }
})

btnLoan.addEventListener("click",function(e){
e.preventDefault();
const amount=Number(inputLoanAmount.value)
const amountValid=currentAccount.movements.some(
  (mov) => amount >= mov*0.1)
  console.log(amount)
  console.log(amountValid)

  if(amount>0 && amountValid){
    setTimeout(()=>{
      currentAccount.movements.push(amount) 
      currentAccount.movementsDates.push(new Date().toISOString())
      updateUI(currentAccount)
    },1000)
    inputLoanAmount.value=""

  }
})

let sort=false;

btnSort.addEventListener("click", function(e){
  e.preventDefault()
  displayMovements(currentAccount,!sort)
  sort=!sort
})
labelTimer

