var clients = require("../data/data.json")

const factor = {
    "Mensual": 12,
    "Semanal": 52
}

const MVA = 48000

/**
 * @description:Functions which returns every earnings of determinated employee
 * @param: employee is the employee object with all information.
 */
function getRIA(employee) {
    const payMethod = employee['Frecuencia de pago']
    const usedFactor = factor[payMethod]
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
 * @description: Returns the ISR amount for determinated employee code.
 * @param: employee which is integer and has the key to identify given employee.  
 */
function getISR(employee) {
    if (clients.hasOwnProperty(employee)) {
        const client = clients[employee]
        const RIA = getRIA(client)
        const RN = RIA - MVA      
        console.log(RN)  
        if(RIA - MVA  < 0) 
            return {isr:0}
        const R = factor[ client['Frecuencia de pago'] ]
        const ISRA = RN * 0.05
        const ISR = ISRA/ R 
        return `Cliente ${client.nombre} paga ${ISR}`
    }
    else {
        return "No se ha encontrado el empleado."
    }
}

module.exports.getISR = getISR;