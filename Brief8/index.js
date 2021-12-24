// class
let booksroom =class{
    constructor(title,author,price,date,authormail,lang,radio){
    this.title = title;
    this.author= author;
    this.price= price;
    this.date = date;
    this.authormail =authormail;
    this.lang = lang;
    this.radio =radio;
}
info(){
    return (" The "+ this.title+ " is a " + this.radio+ "  book in " + this.lang
    + " language, written by " +this.author+ " and published on the " +this.date
    + " the price of it is "  + this.price+" dhs. ");
}
}

lst =[];
// local storage
 lst=JSON.parse(localStorage.getItem('lst'));
if(lst==null){
    lst=[];
}
else{
    lst=JSON.parse(localStorage.getItem('lst'));
}

button.addEventListener('click',()=>{

let title= document.getElementById('title');
let author= document.getElementById('author');
let price= document.getElementById('price');
let date= document.getElementById('date');
let authormail=document.getElementById('authormail');
let lang=document.getElementById('lang');
let table=document.getElementById('tablee');
let button= document.getElementById('button');
let radio= document.querySelector('input[name="b"]:checked');
let print=document.getElementById('print');

// // validation
let err=[];
function validation(elements,reg){
    let regEx=RegExp(reg,'g');
    if(!regEx.test(elements.value))
    {
        elements.style.border='3px solid red';
        err.push('error');
    }
    else {
            elements.style.border='3px solid green';
        }
}

validation(title,'\\w');
validation(author,'\\w');
validation(price,'(^(\\d{1,5},\\d{1,2})$)|(^(\\d{1,5})$)');
validation(date,'\\w');
validation(authormail,'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

if(radio == null){
    alert('Select a type');  
    err.push('error');
} 
if(err.length !=0){
     document.getElementById('res').innerText='Please fill in the boxes';
    } 

// pushing list 
let book = new booksroom(title.value,author.value,price.value,date.value,authormail.value,lang.value,radio.value);
lst.push(book);
localStorage.setItem('lst',JSON.stringify(lst));

// remove the previous table whenever clicked
function removeRows(parent){
    count = parent.rows.length;
    for(let i = count -1 ; i > 0 ; i--){
        parent.deleteRow(i);
    }
}
removeRows(table);  

// sorting By date
lst.sort((a,z)=>(a.date > z.date)?1:-1); 
console.log(lst);

// icons
function icons (){
    let td = document.createElement('td');
    let editeIcon = document.createElement('i');
    let trashIcon = document.createElement('i');
    let infoIcon= document.createElement('i');
    editeIcon.className+='fa fa-edit';
    editeIcon.setAttribute('onclick','edited(this);');
    trashIcon.className +='fa fa-trash';
    trashIcon.setAttribute('onclick','remove(this);');
    infoIcon.className+='fas fa-comment-dots';
    infoIcon.setAttribute('onclick','show(this);');
    td.appendChild(editeIcon);
    td.appendChild(trashIcon);
    td.appendChild(infoIcon);
    tr.appendChild(td);
    }  
 
// create table
let tr;
function create (elements){
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(elements));
    tr.appendChild(td);
   } 

// add class to table
let  storage = Object.keys(lst[0]);
for ( let book of lst ){
     tr= document.createElement ('tr');
for (let key of storage){
    create (book[key]); 
    }
icons();
table.appendChild(tr);
}



}); 


// edit icon
function edited(elem){
    elem.parentElement.parentElement.setAttribute('contenteditable','true');
    elem.removeAttribute('onclick');
    elem.setAttribute('onclick','checked(this)');    
    elem.className+=' fa-times';
}
function checked(elem){
    parent= elem.parentElement.parentElement; //bringing Tr
    rowIndex= parent.rowIndex -1; //tr index
    lst[rowIndex].title=parent.children[0].innerText; 
    lst[rowIndex].author=parent.children[1].innerText; 
    lst[rowIndex].price=parent.children[2].innerText; 
    lst[rowIndex].date=parent.children[3].innerText; 
    lst[rowIndex].authormail=parent.children[4].innerText; 
    lst[rowIndex].lang=parent.children[5].innerText; 
    lst[rowIndex].radio=parent.children[6].innerText; 
    elem.parentElement.parentElement.setAttribute('contenteditable','false');
    elem.removeAttribute('onclick');
    elem.setAttribute('onclick','edited(this)');  
    elem.className+='fa fa-edit';

}

// delete icon
function remove(elem){
    parent= elem.parentElement.parentElement; 
    rowIndex= parent.rowIndex -1;
    elem.parentElement.parentElement.remove();
    lst.splice(rowIndex, 1); //Deleting from the list
}

// info icon
function show(elem){
    console.log('test');
    parent= elem.parentElement.parentElement; 
    rowIndex= parent.rowIndex -1;
    alert(lst[rowIndex].info());
}

// print
function printDiv(){
    var table = document.getElementById("tablee");
    var mywindow = window.open('', 'new div', 'height=400,width=600');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write( "<link rel=\"stylesheet\" href=\"main.css\" type=\"text/css\" media=\"print\"/>" );
    mywindow.document.write('</head><body >');
    mywindow.document.write('<style>#table{width:100%}; </style>')
    mywindow.document.write(table.outerHTML);
    mywindow.document.close();
    mywindow.focus();
    setTimeout(function(){mywindow.print();},3000);
}
console.log(lst);

