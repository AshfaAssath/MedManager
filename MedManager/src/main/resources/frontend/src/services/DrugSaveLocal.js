export const dosage=[
    "1-1-1","1-0-1","0-0-1","0-1-1","1-0-0"
]


const KEYS={
    drugs:'drugs',
    drugId:'drugId'
}
export function insertDrug(newDrug){
    // let drugs=getAllDrugs();
        //   drugs.push(newDrug);
            localStorage.setItem(KEYS.drugs,JSON.stringify(newDrug))
   
}

//export function generateDrug


export function getAllDrugs(){
    if(localStorage.getItem(KEYS.drugs==null))
        localStorage.setItem(KEYS.drugs,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.drugs));
}

