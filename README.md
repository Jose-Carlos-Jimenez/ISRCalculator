# ISR Calculator  
A simple express API which calculates isr of given data inside project.     

## Steps
## PART I: Download & Build on local

## Method 1: From github
### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/Jose-Carlos-Jimenez/ISRCalculator
npm install
npm start
```

Open your local browser and verify the API is working by accessing:     
`http://localhost:3000/`   

## PART II: Usage

### 1) http://localhost:3000/proyeccionisr
```  
Just send in the body a JSON object with the key of the employee.

Example: 
```JSON
{
    "colaborador": "00023"
}
```
