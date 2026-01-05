/*let num1 = 5
let num2 = 10
let condition =!(num1 >= 3 || num2 >= 10);
console.log("condition: ",condition);

let age = 25;
let gender = "ชาย";

if(age >=20 && gender == "ชาย"){
    console.log("ผู้ชายที่มีอายุ 20 ปีขึ้นไป");
}*/
/*let num = 20
if(num % 2 ==0){
    console.log("เป็นเลขคู่")
}*/
/*let counter = -5;
while(counter < 10){
    console.log("Hello world");
    //counter=counter+1;
    //counter +=1;
    counter ++;
}

for(let i =0; i<10; i++){
    console.log('Hello World from for loop');
}*/

/*let a= 10
let b= 20
let c= 30
console.log('a:',a,'b:',b,'c:',c)

let ages = [10,20,30]
console.log('ages:',ages)
console.log('ages[1]:',ages[1])

ages = [15,25]
console.log('ages list:',ages)

ages.push(35)
console.log('ages after push:',ages)

ages.pop()
console.log('ages after pop:',ages)
*/
/*let ages = [25,30,35,40,45]
console.log('Ages:',ages)

let fruits = ['apple','banana','cherry']
console.log('Fruits:',fruits)
fruits.push('mango')
console.log('Fruits after push:',fruits)
console.log('First fruit:',fruits.length)
for(let i =0; i< fruits.length; i++){
    console.log('Fruit at inbex ${i}:',fruits[i])
}*/
/*if(ages.includes(30)){
    console.log('Age 30 is found in the array.')
}*/
/*let student =[{
    age:30,
    name:'john',
    grade: 'A'
},{
    age: 25,
    name: "Jane",
    grade: 'B'
}]
for(let i =0; i< student.length; i++){
    console.log("Student "+ (i+1)+":");
    console.log("Name: "+student[i].name);
    console.log("Age: "+student[i].age);
    console.log("Grade: "+student[i].grade);
}
student.push({
    age: 28,
    name: 'Mike',
    grade: 'C'
});
console.log("Added new student: ",student[student.length-1]);

student.pop();
console.log("Removed last student. Current students: ",student);*/

/*let score1 = 10
let score2 = 80

function calcuation_grade(score){


    if(score1>=80){
        grade = 'A'
    } else if (score>=70){
        grade = 'B'
    } else if (score>=60){
        grade = 'C'
    } else if (score>=50){
        grade = 'D'
    } else {
        grade = 'F'
    } 
    return grade
}
let grade1 = calcuation_grade(score1)
let grade2 = calcuation_grade(score2)
console.log('Score1: '+score1+'Grdae: '+grade1)
console.log('Score2: '+score2+'Grdae: '+grade2)*/
/*let scores = [90,80,70,60,50];
let newScores = []
for(let i= 0; i<scores.length; i++){
    console.log(scores[i]);
    /*if (scores[i]>=60){
        newScores.push(scores[i]);
    }*/
/*}
let newScores = scores.filter(function(score){
    return score >= 70;
})
newScores.forEach((ns)=>{
    console.log('new score: '+ns);
}) */
/*for (let i =0; i<scores.length; i++){
    console.log('Score ${i+1}:${scores[i]}');

    scores = scores.map((s)=>{
        return s * 10;
    })
}
scores.forEach((s)=>{
    console.log('score:',s);
})*/

//mad , filter

let student = [
    {name: "john", age: 20, grade: 'A'},
    {name: "jane", age: 22, grade: 'B'},
    {name: "jim", age: 21, grade: 'C'}
    
]
console.log('Student',students[0]);
let student =student.find(()=>{
    return s.name==="Jane";
    /*if (s.anme==="jim"){
        return true; 
    }*/
})

let dubblescoreStudent = students.map((s)=>{
    s.age = s.age * 2;
    return s;
});

let highGradeStudents = students.filter((s)=>{
    return s.grade === 'A';
});
console.lot('Found Student',student);
console.log('Dubble Score Students',dubblescoreStudent);

