window.addEventListener("load",()=>{
    let main = new Main();
    main.ListaInicial();
    let btnAgregar = Main.$("btnAgregar");
    btnAgregar?.addEventListener("click",main);

    let btnCancelar = Main.$("btnCancelar");
    btnCancelar.addEventListener("click",main);

    let optionTipo = Main.$("NselectTipo");
    optionTipo.addEventListener("change",main);

    let btnGuardar = Main.$("btnGuardar");
    btnGuardar.addEventListener("click",main);

    let checkId = Main.$("mostrarId");
    checkId.addEventListener("change",main);
    let checkMarca = Main.$("mostrarMarca");
    checkMarca.addEventListener("change",main);
    let checkModelo = Main.$("mostrarModelo");
    checkModelo.addEventListener("change",main);
    let checkPrecio = Main.$("mostrarPrecio");
    checkPrecio.addEventListener("change",main);

    let mostrarTipo = Main.$("selectTipo");
    mostrarTipo.addEventListener("change",main);

    let btnPromedio = Main.$("btnCalcularProm");
    btnPromedio.addEventListener("click",main);

})

class Main implements EventListenerObject
{
    public listaVehiculos:Array<Vehiculo>;

    public constructor()
    {
        this.listaVehiculos = new Array<Vehiculo>();
    }

    handleEvent(evt: Event): void 
    {
        let target = evt.target;
        switch((<HTMLInputElement>target).id)
        {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
            case "NselectTipo":
                this.MostrarTipo();
                break;
            case "btnGuardar":
                this.GuardarNuevo();
                break;
            case "mostrarId":
            case "mostrarMarca":
            case "mostrarModelo":
            case "mostrarPrecio":
                this.CargarLista();
                break;
            case "selectTipo":
                this.CargarPorTipo();
                break;
            case "btnCalcularProm":
                this.CalcularPromedio();
                break;
            default:
                if((<HTMLInputElement>target).className == "btnEliminar")
                {
                    this.Eliminar(evt);
                }
                break;

        }
    }

    public static $(id:string):HTMLElement
    {
        return <HTMLElement>document.getElementById(id);
    }
    public Agregar():void
    {
        this.AbrirGrilla();
        
    }
    public CargarPorTipo():void
    {
        let listaAux:Array<Vehiculo>;
        let seleccion = (<HTMLInputElement>Main.$("selectTipo")).value;
        if(seleccion == "auto")
        {
            listaAux = this.listaVehiculos.filter(item => item instanceof Auto);
            this.CargarLista(listaAux);
        }
        else if(seleccion == "camioneta")
        {
            listaAux = this.listaVehiculos.filter(item => item instanceof Camioneta);
            this.CargarLista(listaAux);
        }
        else
        {
            this.CargarLista(this.listaVehiculos);   
        }
        (<HTMLInputElement>Main.$("promedio")).value = "";
    }
    public CalcularPromedio():void
    {
        let seleccion = (<HTMLInputElement>Main.$("selectTipo")).value;

        let promedio:number;
        let contador = 0;
        let resultado;

        if(seleccion == "auto")
        {
            promedio = this.listaVehiculos.filter(item => item instanceof Auto).reduce((total,item)=>{
                contador++;
                return total += item.precio;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
        else if(seleccion == "camioneta")
        {
            promedio = this.listaVehiculos.filter(item => item instanceof Camioneta).reduce((total,item)=>{
                contador++;
                return total += item.precio;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
        else
        {
            promedio = this.listaVehiculos.reduce((total,item)=>{
                contador++;
                return total += item.precio;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
    }
    public CargarLista(lista?:Array<Vehiculo>):void
    {
        
        let cabecera = <HTMLElement>Main.$("tCabecera");
        while(cabecera.hasChildNodes())
        {
            cabecera.removeChild(<Node>cabecera.lastChild);
        }
        

        let cuerpo = <HTMLInputElement>Main.$("tCuerpo");
        while(cuerpo.hasChildNodes())
        {
            cuerpo.removeChild(<Node>cuerpo.lastChild);
        }
        if(lista != null)
        {
            if(lista.length > 0)
            {
                let cargarHead = 0;
                lista.forEach(vh => {
                    if(cargarHead == 0)
                    {
                        this.CargarVh(vh,1);
                        cargarHead = 1;
                    }
                    else
                    {
                        this.CargarVh(vh);
                    }
    
                });
            }
        }
        else
        {
            if(this.listaVehiculos.length > 0)
            {
                let cargarHead = 0;
                this.listaVehiculos.forEach(vh => {
                    if(cargarHead == 0)
                    {
                        this.CargarVh(vh,1);
                        cargarHead = 1;
                    }
                    else
                    {
                        this.CargarVh(vh);
                    }
    
                });
            }
        }
        
    }
    public GuardarNuevo():void
    {
        let marca = (<HTMLInputElement>Main.$("marca")).value;
        let modelo = (<HTMLInputElement>Main.$("modelo")).value;
        let precio = parseInt((<HTMLInputElement>Main.$("precio")).value);
        let seleccion = (<HTMLInputElement>Main.$("NselectTipo")).value;
        if(seleccion == "auto")
        {
            let puertas = parseInt((<HTMLInputElement>Main.$("cantidadPuertas")).value);
            let aux = new Auto(this.UltimoIdDisponible(),marca,modelo,precio,puertas);
            this.CargarVh(aux);
            this.listaVehiculos.push(aux);
        }
        else if(seleccion == "camioneta")
        {
            if((<HTMLInputElement>Main.$("tipoCamioneta")).value == "si")
            {
                let aux = new Camioneta(this.UltimoIdDisponible(),marca,modelo,precio,true);
                this.CargarVh(aux);
                this.listaVehiculos.push(aux);
            }
            else if((<HTMLInputElement>Main.$("tipoCamioneta")).value == "no")
            {
                let aux = new Camioneta(this.UltimoIdDisponible(),marca,modelo,precio,false);
                this.CargarVh(aux);
                this.listaVehiculos.push(aux);
            }
        }
        this.CerrarGrilla();
    }
    public UltimoIdDisponible():number
    {
        if(this.listaVehiculos.length > 0)
        {
            let idDisponible = this.listaVehiculos.reduce((idMax,vh)=>{
                if(vh.id >idMax)
                {
                    return vh.id;
                }
                else
                {
                    return idMax;
                }
            },0);
            idDisponible++;
            return idDisponible;
        }
        return 1;
        
    }
    
    public ListaInicial():void
    {

        if(localStorage.length == 0 )
        {
            let au1 = new Auto(this.UltimoIdDisponible(),"Ford","Mondeo",502120,4);
            
            this.listaVehiculos.push(au1);

            let au2 = new Auto(this.UltimoIdDisponible(),"Fiat","Palio",305224,5);
            
            this.listaVehiculos.push(au2);

            let au3 = new Auto(this.UltimoIdDisponible(),"Fiat","Siena",402120,4);
            
            this.listaVehiculos.push(au3);

            let au4 = new Auto(this.UltimoIdDisponible(),"Vw","Fox",705822,3);
            
            this.listaVehiculos.push(au4);

            let ca1 = new Camioneta(this.UltimoIdDisponible(),"Vw","Amarok",805562,true);
            
            this.listaVehiculos.push(ca1);

            let ca2 = new Camioneta(this.UltimoIdDisponible(),"Ford","Ranger",1205562,false);
            
            this.listaVehiculos.push(ca2);

            let ca3 = new Camioneta(this.UltimoIdDisponible(),"Rover","Range",2105562,true);
            
            this.listaVehiculos.push(ca3);
            
            let ca4 = new Camioneta(this.UltimoIdDisponible(),"Doogge","Ram",2505562,true);
            
            this.listaVehiculos.push(ca4);
            
        }
        this.CargarLista();
    }
    public EliminarId(id:number):boolean
    {
        
        for(let i=0;i<this.listaVehiculos.length;i++)
        {
            if((<Vehiculo>this.listaVehiculos[i]).id == id)
            {
                this.listaVehiculos.splice(i,1);
                return true;
            }
        }
        
        return false;
    }
    public Eliminar(ev:Event):void
    {
        let elemento = <HTMLElement>ev.target;
        let tcuerpo = Main.$("tCuerpo");

        if((<HTMLInputElement>Main.$("mostrarId")).checked)
        {
            let id = parseInt(<string>elemento.parentElement?.parentNode?.childNodes.item(0).textContent);
            
            if(this.EliminarId(id))
            {
                tcuerpo.removeChild(<Node>elemento.parentElement?.parentNode);
            }
        }
        else
        {
            alert("Debe seleccionar la casilla de ID para eliminar");
        }
    }
    public Mostrar():void
    {
        console.log("entro");
    }
    public AbrirGrilla():void
    {
        Main.$("contGrilla").style.display = "block";

        let campoMarca = Main.$("marca");
        (<HTMLInputElement>campoMarca).value = "";

        let campoModelo = Main.$("modelo");
        (<HTMLInputElement>campoModelo).value = "";

        let campoPrecio = Main.$("precio");
        (<HTMLInputElement>campoPrecio).value = "";


    }
    public CerrarGrilla():void
    {
        
        (<HTMLInputElement>Main.$("contGrilla")).style.display = "none";
    }
    public MostrarTipo():void
    {
        let tipo = Main.$("NselectTipo");
        if((<HTMLInputElement>tipo).value == "auto")
        {
            (<HTMLInputElement>Main.$("fAuto")).style.display = "block";
            (<HTMLInputElement>Main.$("fCamioneta")).style.display = "none";
        }
        else if((<HTMLInputElement>tipo).value == "camioneta")
        {
            (<HTMLInputElement>Main.$("fCamioneta")).style.display = "block";
            (<HTMLInputElement>Main.$("fAuto")).style.display = "none";
        }
    }

    public CargarVh(vh:Vehiculo,cargarHead?:number):void
    {
        let tCabecera = Main.$("tCabecera");
        let tCuerpo =Main.$("tCuerpo");

        let tr = document.createElement("tr");
        let th = document.createElement("tr");

        let selecciono = 0;

        if((<HTMLInputElement>Main.$("mostrarId")).checked)
        {
            if(this.listaVehiculos.length==0 || cargarHead)
            {
                let thId = document.createElement("th");
                th.appendChild(thId);
                let nodoThId = document.createTextNode("Id");
                thId.appendChild(nodoThId);
            }
            


            let tdId = document.createElement("td");
            tr.appendChild(tdId);
            let nodoTdId = document.createTextNode(vh.id.toString());
            tdId.appendChild(nodoTdId);
            selecciono=1;
        }

        if((<HTMLInputElement>Main.$("mostrarMarca")).checked)
        {
            if(this.listaVehiculos.length==0 || cargarHead)
            {
                let thMarca = document.createElement("th");
                th.appendChild(thMarca);
                let nodoThMarca = document.createTextNode("Marca");
                thMarca.appendChild(nodoThMarca);
            }
            

            let tdMarca = document.createElement("td");
            tr.appendChild(tdMarca);
            let nodoTdMarca = document.createTextNode(vh.marca);
            tdMarca.appendChild(nodoTdMarca);
            selecciono=1;
        }

        if((<HTMLInputElement>Main.$("mostrarModelo")).checked)
        {
            if(this.listaVehiculos.length==0 || cargarHead)
            {
                let thModelo = document.createElement("th");
                th.appendChild(thModelo);
                let nodoThModelo = document.createTextNode("Modelo");
                thModelo.appendChild(nodoThModelo);
            }
            

            let tdModelo = document.createElement("td");
            tr.appendChild(tdModelo);
            let nodoModelo = document.createTextNode(vh.modelo);
            tdModelo.appendChild(nodoModelo);
            selecciono=1;
        }

        if((<HTMLInputElement>Main.$("mostrarPrecio")).checked)
        {
            if(this.listaVehiculos.length==0 || cargarHead)
            {
                let thPrecio = document.createElement("th");
                th.appendChild(thPrecio);
                let nodoThPrecio = document.createTextNode("Precio");
                thPrecio.appendChild(nodoThPrecio);
            }
            

            let tdPrecio = document.createElement("td");
            tr.appendChild(tdPrecio);
            let nodoTdPrecio = document.createTextNode(vh.precio.toString());
            tdPrecio.appendChild(nodoTdPrecio);
            selecciono=1;
        }

        if(selecciono == 1)
        {
            if(this.listaVehiculos.length==0 || cargarHead)
            {
                let thEliminar = document.createElement("th");
                th.appendChild(thEliminar);
                let nodoEliminar = document.createTextNode("Accion");
                thEliminar.appendChild(nodoEliminar);
            }
            

            let tdEliminar = document.createElement("td");
            tr.appendChild(tdEliminar);
            let anclaEliminar = document.createElement("button");
            tdEliminar.appendChild(anclaEliminar);
            anclaEliminar.className = "btnEliminar";
            
            let textoAncha = document.createTextNode("Eliminar");
            anclaEliminar.appendChild(textoAncha);
            
            anclaEliminar.addEventListener("click",this);
        }
        tCabecera?.appendChild(th);
        tCuerpo?.appendChild(tr);
    }
}