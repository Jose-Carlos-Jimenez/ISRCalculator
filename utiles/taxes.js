/**
 * @import clients is our dummie data to simulate a MongoDB response.
 */
var clients = require("../data/data.json")

/**
 * @constant FACTOR:  is used to know how many times is the employee getting paid.
 */
const FACTOR = {
    "Mensual": 12,
    "Semanal": 52
}

/**
 * @constant MVA: Minimum of earnings to paid ISR.
 */
const MVA = 48000

/**
 * @function getRIA
 * @description:Functions which returns every earnings of determinated employee
 * @param: employee is the employee object with all information.
 */
function getRIA(employee) {
    const payMethod = employee['Frecuencia de pago']
    const usedFactor = FACTOR[payMethod]
    if (usedFactor === 12) {//Mensual
        const salary = employee["Pagos Anuales"]["Sueldo Mensual"]
        const monthlyEarning = salary["Ingresos afectos"] - salary["Descuentos afectos"]
        let extras = employee["Bono 14"]["Ingresos afectos"] + employee["Aguinaldo"]["Ingresos afectos"]

        if (employee.hasOwnProperty("Bono aniversario"))
            extras += employee["Bono aniversario"]["Ingresos afectos"]

        return usedFactor * monthlyEarning + extras;

    } else if (usedFactor === 52) {//Pago semanal
        const salary = employee["Pagos Anuales"]["Sueldo Semanal"]
        const weeklyEarnings = salary["Ingresos afectos"] - salary["Descuentos afectos"]
        let extras = employee["Bono 14"]["Ingresos afectos"] + employee["Aguinaldo"]["Ingresos afectos"]

        if (employee.hasOwnProperty("Bono aniversario"))
            extras += employee["Bono aniversario"]["Ingresos afectos"]

        return usedFactor * weeklyEarnings + extras;

    }
    return 0
}

/**
 * @function getISR
 * @description: Returns the ISR amount for determinated employee code.
 * @param employee: Integer that has the key to identify given employee.  
 */
function getISR(employee) {
    if (clients.hasOwnProperty(employee)) {
        const client = clients[employee]
        const RIA = getRIA(client)
        const RN = RIA - MVA      
        if(RIA - MVA  < 0) 
            return 0
        const R = FACTOR[ client['Frecuencia de pago'] ]
        const ISRA = RN * 0.05
        const ISR = ISRA/ R 
        return ISR.toFixed(2)
    }
    else {
        console.error("Empleado no encontrado.")
        return "No se ha encontrado el empleado."
    }
}

module.exports.getISR = getISR;