window.addEventListener("load", () => {
    let main = new Main();
    main.ListaInicial();
    
    let btnAgregar = <HTMLElement>document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);

    let btnCancelar = <HTMLElement>document.getElementById("btnCancelar");
    btnCancelar.addEventListener("click", main);

    let btnTipo = <HTMLElement>document.getElementById("NselectTipo");
    btnTipo.addEventListener("change", main);

    let btnGuardar = <HTMLElement>document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", main);

    let checkId = <HTMLElement>document.getElementById("mostrarId");
    checkId.addEventListener("click", main);

    let checkMarca = <HTMLElement>document.getElementById("mostrarMarca");
    checkMarca.addEventListener("click", main);

    let checkModelo = <HTMLElement>document.getElementById("mostrarModelo");
    checkModelo.addEventListener("click", main);

    let checkPrecio = <HTMLElement>document.getElementById("mostrarPrecio");
    checkPrecio.addEventListener("click", main);

    let selecTipo = <HTMLElement>document.getElementById("selectTipo");
    selecTipo.addEventListener("change", main);

    let btnPromedio = <HTMLElement>document.getElementById("btnCalcularProm");
    btnPromedio.addEventListener("click", main);
    
});

class Main implements EventListenerObject 
{

    public listaVehiculos: Array<Vehiculo>;

    
    public constructor() 
    {
        this.listaVehiculos= new Array<Vehiculo>();
    }

    public handleEvent(event: Event) 
    {
        
        let ev:Element = <Element>event.target;
        
        
        switch(ev.id)
        {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "NselectTipo":
                this.MostrarTipo();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
                break;
            case "btnGuardar":
                this.Agregar();
                break;
                case "mostrarId":
                case "mostrarMarca":
                case "mostrarModelo":
                case "mostrarPrecio":
                    this.CargarLista();
                    break;
            case "selectTipo":
                this.MostrarTipoSeleccionado();
                break;
            case "btnCalcularProm":
                this.CalcularPromedio();
                break;
        }

    }
    public Agregar():void
    {
        let marca = (<HTMLInputElement>Funciones.$("marca")).value;
        let modelo = (<HTMLInputElement>Funciones.$("modelo")).value;
        let precio = (<HTMLInputElement>Funciones.$("precio")).value;
        
        let vhAux;

        let seleccion =<HTMLInputElement> Funciones.$("NselectTipo");
        if(seleccion.value == "auto")
        {
            let tipo =(<HTMLInputElement>Funciones.$("cantidadPuertas")).value;
            vhAux = new Auto(this.RecuperarIdDisponible(),marca,modelo,Number(precio),Number(tipo));
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(vhAux.AutoToJSON()));
            this.listaVehiculos.push(vhAux);

            this.CargarVehiculo(vhAux);

        }
        else if(seleccion.value == "camioneta")
        { 
            let tipo =(<HTMLInputElement>Funciones.$("tipoCamioneta")).value;
            if(tipo=="si")
            {
                vhAux = new Camioneta(this.RecuperarIdDisponible(),marca,modelo,Number(precio),true);
                localStorage.setItem(localStorage.length.toString(),JSON.stringify(vhAux.CamionetaToJSON()));
                this.listaVehiculos.push(vhAux);

                this.CargarVehiculo(vhAux);
            }
            else if(tipo=="no")
            {
                vhAux = new Camioneta(this.RecuperarIdDisponible(),marca,modelo,Number(precio),false);
                localStorage.setItem(localStorage.length.toString(),JSON.stringify(vhAux.CamionetaToJSON()));
                this.listaVehiculos.push(vhAux);

                this.CargarVehiculo(vhAux);
            } 
                
        }
        this.CerrarGrilla();
        
    }
    public RecuperarIdDisponible():number
    {
        let id=1;
        
        if(this.listaVehiculos.length > 0)
        {
            let arrayId:Array<number> = new Array();
            this.listaVehiculos.forEach(element => {
                
                arrayId.push(element.GetId);
            });
            id = arrayId.reduce((idMax,item)=>{
                if(item>idMax){
                  return item;
                }else{
                  return idMax;
                }
              },1);
              id++;
        }
        
        return id;
       
    }
    
    public ListaInicial()
    {

        if(localStorage.length == 0 )
        {
            let au1 = new Auto(this.RecuperarIdDisponible(),"Ford","Mondeo",502120,4);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(au1.AutoToJSON()));
            this.listaVehiculos.push(au1);

            let au2 = new Auto(this.RecuperarIdDisponible(),"Fiat","Palio",305224,5);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(au2.AutoToJSON()));
            this.listaVehiculos.push(au2);

            let au3 = new Auto(this.RecuperarIdDisponible(),"Fiat","Siena",402120,4);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(au3.AutoToJSON()));
            this.listaVehiculos.push(au3);

            let au4 = new Auto(this.RecuperarIdDisponible(),"Vw","Fox",705822,3);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(au4.AutoToJSON()));
            this.listaVehiculos.push(au4);

            let ca1 = new Camioneta(this.RecuperarIdDisponible(),"Vw","Amarok",805562,true);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(ca1.CamionetaToJSON()));
            this.listaVehiculos.push(ca1);

            let ca2 = new Camioneta(this.RecuperarIdDisponible(),"Ford","Ranger",1205562,false);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(ca2.CamionetaToJSON()));
            this.listaVehiculos.push(ca2);

            let ca3 = new Camioneta(this.RecuperarIdDisponible(),"Rover","Range",2105562,true);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(ca3.CamionetaToJSON()));
            this.listaVehiculos.push(ca3);
            
            let ca4 = new Camioneta(this.RecuperarIdDisponible(),"Doogge","Ram",2505562,true);
            localStorage.setItem(localStorage.length.toString(),JSON.stringify(ca4.CamionetaToJSON()));
            this.listaVehiculos.push(ca4);
            
        }
        this.CargarLista();
    }
    public CerrarGrilla():void
    {
        let selecAuto =<HTMLInputElement> Funciones.$("contGrilla");
            selecAuto.style.display = "none";
    }
    public MostrarTipo():void 
    {
        let seleccion =<HTMLInputElement> Funciones.$("NselectTipo");
        let selecAuto =<HTMLInputElement> Funciones.$("fAuto");
        let selecCamioneta =<HTMLInputElement> Funciones.$("fCamioneta");
        
        if(seleccion.value == "auto")
        {
            selecAuto.hidden = false;
            selecCamioneta.hidden = true;   
        }
        else if(seleccion.value == "camioneta")
        { 
            selecCamioneta.hidden = false;
            selecAuto.hidden = true;
        }
    }
    public MostrarTipoSeleccionado():void
    {
        let tipo = (<HTMLInputElement>Funciones.$("selectTipo")).value;
        let listaRetorno;
        if(tipo == "auto")
        {
            listaRetorno = this.listaVehiculos.filter(vh=>vh instanceof Auto);
        }
        else if(tipo == "camioneta")
        {
            listaRetorno = this.listaVehiculos.filter(vh=>vh instanceof Camioneta);
        }
        (<HTMLInputElement>Funciones.$("promedio")).value = "";
        this.CargarLista(listaRetorno);    
    }
    public AbrirGrilla(): void 
    {
        Funciones.$("contGrilla").style.display = "block";
        (<HTMLInputElement>Funciones.$("marca")).value = "";
        (<HTMLInputElement>Funciones.$("modelo")).value = "";
        (<HTMLInputElement>Funciones.$("precio")).value = "";     
    }
    public get GetLista():Array<Vehiculo>
    {
        return this.listaVehiculos;
    }
    
    public CargarLista(lista?:Array<Vehiculo>):void
    {
        let tCuerpo = Funciones.$("tCuerpo");
        
        while (tCuerpo.hasChildNodes()) 
        {
            tCuerpo.removeChild(<HTMLTableElement>tCuerpo.lastChild);   
        }
        if(lista != null)
        {  
            lista.forEach(vh => {
                this.CargarVehiculo(vh);
            });
        }
        else
        {
            if(this.listaVehiculos.length == 0)
            {
                this.CargarDesdeLocalHost();
            }
            
            this.listaVehiculos.forEach(element => {
                this.CargarVehiculo(element);
            });
        }
    }
    
    public CargarDesdeLocalHost():void
    {
        
        for(let i=0;i<=localStorage.length;i++)
        {
            let vhAux = JSON.parse(String(localStorage.getItem(i.toString())));
            if(vhAux != null)
            {  
                if(vhAux.cantidadPuertas != null)
                {
                    let aux = new Auto(vhAux.id,vhAux.marca,vhAux.modelo,vhAux.precio,vhAux.cantidadPuertas);
                    this.listaVehiculos.push(aux);   
                }
                else
                {
                    let aux = new Camioneta(vhAux.id,vhAux.marca,vhAux.modelo,vhAux.precio,vhAux.esCuatroXCuatro);
                    this.listaVehiculos.push(aux);
                }
            }
        }
        
    }
    public CalcularPromedio():void
    {
        let tipo = (<HTMLInputElement>Funciones.$("selectTipo")).value;
        let listaRetorno;
        let contador = 0;
        let total = 0;
        if(tipo == "auto")
        {
            listaRetorno = this.listaVehiculos.filter(vh=>vh instanceof Auto).reduce((total:number,item:Vehiculo)=>{
                contador++;
                total += item.GetPrecio;
                return total;
            },0);
            total =  listaRetorno/contador;
        }
        else if(tipo == "camioneta")
        {
            listaRetorno = this.listaVehiculos.filter(vh=>vh instanceof Camioneta).reduce((total:number,item:Vehiculo)=>{
                contador++;
                total += item.GetPrecio;
                return total;
            },0);
            total =  listaRetorno/contador;
        }
        else
        {
            listaRetorno = this.listaVehiculos.reduce((total:number,item:Vehiculo)=>{
                contador++;
                total += item.GetPrecio;
                return total;
            },0);
            total =  listaRetorno/contador;
        }
        
        (<HTMLInputElement>Funciones.$("promedio")).value = total.toString();

    }
    public Eliminar(eve:Event):void
    {
        var elemento =<HTMLInputElement> eve.target;
        let tcuerpo = Funciones.$("tCuerpo");
        let encontroId = -1;
        //creo una lista auxiliar en la cual guardo los vh para luego volver a cargar el localstorage
        let auxList = new Array<Vehiculo>();
        
        if((<HTMLInputElement>Funciones.$("mostrarId")).checked)
        {
            let id = <string>elemento.parentElement?.parentNode?.childNodes.item(0).textContent;
            
            for(let i=0;i<localStorage.length;i++)
            {
                let vhAux = JSON.parse(String(localStorage.getItem(i.toString()))); 
                //cargo los vehiculos en una lista auxiliar
                if(vhAux.cantidadPuertas != null)
                {
                    let aux = new Auto(vhAux.id,vhAux.marca,vhAux.modelo,vhAux.precio,vhAux.cantidadPuertas);
                    auxList.push(aux);
                }
                else
                {
                    let aux = new Camioneta(vhAux.id,vhAux.marca,vhAux.modelo,vhAux.precio,vhAux.esCuatroXCuatro);

                    auxList.push(aux);
                }
                

                if(vhAux!=null && vhAux.id == parseInt(id))
                {
                    encontroId = i;
                }
            }
            if(encontroId > -1)
            {
                auxList.splice(encontroId,1);
                localStorage.clear();
               
                for(let i=0;i<auxList.length;i++)
                {
                    if(auxList[i] instanceof Auto)
                    {
                        let aux = <Auto>auxList[i];
                        
                        localStorage.setItem(i.toString(),JSON.stringify(aux.AutoToJSON()));
                    }
                    else if(auxList[i] instanceof Camioneta)
                    {
                        localStorage.setItem(i.toString(),JSON.stringify((<Camioneta>(auxList[i])).CamionetaToJSON()));
                    }
                }
                
                console.log("se borro el id "+ encontroId);
                tcuerpo.removeChild(<Node>elemento.parentElement?.parentNode);
               
            } 
        }
        else{
            alert("Para eliminar debe hacer visible el Id");
        } 
    }

    //sin uso
    public AcualizarLista(auxList:Array<Vehiculo>):void
    {
        localStorage.clear();
        console.log("despues de limpiar "+localStorage.length);
        for(let i=0;i<auxList.length;i++)
        {
            if(auxList[i] instanceof Auto)
            {
                let aux = <Auto>auxList[i];
                
                localStorage.setItem(i.toString(),JSON.stringify(aux.AutoToJSON()));
            }
            else if(auxList[i] instanceof Camioneta)
            {
                localStorage.setItem(i.toString(),JSON.stringify((<Camioneta>(auxList[i])).CamionetaToJSON()));
            }
        }
    }
    public CargarVehiculo(vh:Vehiculo):void
    {
        // se encarga de limpiar las columnas de la cabezera
        let tCuerpo = Funciones.$("tCuerpo");

        let tCabecera = Funciones.$("tCabecera");

        while (tCabecera.hasChildNodes()) {
            tCabecera.removeChild(<HTMLTableElement>tCabecera.lastChild);
            
        }
        
        let cargo = 0;
        let tr = document.createElement("tr");
        let thC = document.createElement("tr");
        if((<HTMLInputElement>Funciones.$("mostrarId")).checked)
        {
            let th = document.createElement("th");
            thC.appendChild(th);
            let nodoidC = document.createTextNode("Id");
            th.appendChild(nodoidC);

            let tdId = document.createElement("td");
            tr.appendChild(tdId);
            let nodoId = document.createTextNode(vh.GetId.toString());
            tdId.appendChild(nodoId);
            cargo = 1;
        }
    
        if((<HTMLInputElement>Funciones.$("mostrarMarca")).checked)
        {
            let th = document.createElement("th");
            thC.appendChild(th);
            let nodoMarcaC = document.createTextNode("Marca");
            th.appendChild(nodoMarcaC);

            let tdMarca = document.createElement("td");
            tr.appendChild(tdMarca);
            let nodoMarca = document.createTextNode(vh.GetMarca);
            tdMarca.appendChild(nodoMarca);
            cargo = 1;
        }
       
        if((<HTMLInputElement>Funciones.$("mostrarModelo")).checked)
        {
            let th = document.createElement("th");
            thC.appendChild(th);
            let nodoModeloC = document.createTextNode("Modelo");
            th.appendChild(nodoModeloC);

            let tdModelo = document.createElement("td");
            tr.appendChild(tdModelo);
            let nodoModelo = document.createTextNode(vh.GetModelo);
            tdModelo.appendChild(nodoModelo);
            cargo = 1;
        }
        

        if((<HTMLInputElement>Funciones.$("mostrarPrecio")).checked)
        {
            let th = document.createElement("th");
            thC.appendChild(th);
            let nodoPrecioC = document.createTextNode("Precio");
            th.appendChild(nodoPrecioC);

            let tdPrecio = document.createElement("td");
            tr.appendChild(tdPrecio);
            let nodoPrecio = document.createTextNode(vh.GetPrecio.toString());
            tdPrecio.appendChild(nodoPrecio);
            cargo = 1;
        }
        if(cargo == 1)
        {
            let th = document.createElement("th");
            thC.appendChild(th);
            let nodoAccionC = document.createTextNode("Accion");
            th.appendChild(nodoAccionC);

            let tdEliminar = document.createElement("td");
            tr.appendChild(tdEliminar);
            let anclaEliminar = document.createElement("button");
            tdEliminar.appendChild(anclaEliminar);
            anclaEliminar.setAttribute("href", "#");
            anclaEliminar.setAttribute("id","btnEliminar");

            let textoEliminar = document.createTextNode("Elimina");
            anclaEliminar.appendChild(textoEliminar);

            anclaEliminar.addEventListener("click", this.Eliminar);
        }
        
        tCabecera.appendChild(thC);
        tCuerpo.appendChild(tr);
    }
}
