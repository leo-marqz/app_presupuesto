
const ingresos = [];

const egresos = [];


let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos = ()=>{
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let formatoMoneda = (valor) => {
    let nuevoValor = valor.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits:2});
    return nuevoValor;
}

let formatoPorcentaje = (valor) => {
    let nuevoValor = valor.toLocaleString('en-US',{style: 'percent', minimumFractionDigits:2});
    return nuevoValor;
}

let calcularPorcentaje = (egresos, ingresos) => {
    let resultado;
    try{
        resultado = (egresos / ingresos);
    }catch(error){
        console.error(error);
        resultado = 0;
    }

    return resultado;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = calcularPorcentaje(totalEgresos(), totalIngresos());
    document.getElementById('presupuesto').innerText = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerText = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerText = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerText = formatoMoneda(totalEgresos());
}



const crearIngresoHtml = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
    <div class="elemento_valor"> + ${formatoMoneda(ingreso.valor)}</div>
          <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
          </button>
          </div>
          </div>
          </div>
          `;
          
          return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id ===id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
}
        
const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHtml(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}


const crearEgresoHtml = (egreso) => {
    let egresoHTML = `
       <div class="elemento limpiarEstilos">
           <div class="elemento_descripcion">${egreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                        <div class="elemento_valor"> - ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(calcularPorcentaje(egreso.valor,totalIngresos()))}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
}


const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( ingreso => ingreso.id ===id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}


const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHtml(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}


const agregarDato = () => {
    let formulario = document.forms['form'];
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];
    if(descripcion.value != '' && valor.value != ''){
        if(tipo.value === 'ingreso'){
            // el signo mas antes de valor.value lo convierte en numero al igual que usar Number(valor.value)
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
            cargarEgresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value)); // se puede usar Number(valor.value)
            cargarCabecero();
            cargarEgresos();
        }

        descripcion.value = '';
        valor.value = '';
    }
}








