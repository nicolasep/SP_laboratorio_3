window.addEventListener("load",()=>{

    let main = new Main();
    main.ListaInicial();

    let btnAgregar = Main.$("btnAgregar");
    btnAgregar.addEventListener("click",main);

    let btnCancelar = Main.$("btnCancelar");
    btnCancelar.addEventListener("click",main);

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

    let selecTipo = Main.$("gSelect");
    selecTipo.addEventListener("change",main);

    let selecVista = Main.$("selectTipo");
    selecVista.addEventListener("change",main);

    let promedio = Main.$("btnPromedio");
    promedio.addEventListener("click",main);

});

class Main implements EventListenerObject
{
    private listaVh:Array<Vehiculo>;

    public constructor()
    {
        this.listaVh = new Array<Vehiculo>();
    }
    handleEvent(evt: Event): void 
    {
        let evento = evt.target;
        
        switch((<HTMLInputElement>evento).id)
        {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
                break;
            case "btnGuardar":
                this.Guardar();
                break;
            case "mostrarId":
            case "mostrarMarca":
            case "mostrarModelo":
            case "mostrarPrecio":
                this.ModificarColumnas();
                break;
            case "gSelect":
                this.MostrarTipos();
                break;
            case "btnEliminar":
                this.Eliminar(evt);
                break;
            case "selectTipo":
                this.MostrarPorTipo();
                break;
            case "btnPromedio":
                this.CalcularPromedio();
                break;
                //contacto@alkemy.org
        }
    }
    
    public static $(id:string):HTMLElement
    {
        return <HTMLElement>document.getElementById(id);
    }
    public AbrirGrilla():void
    {
        let grilla = Main.$("contGrilla");
        grilla.style.display = "block";
    }
    public CerrarGrilla():void
    {
        let grilla = Main.$("contGrilla");
        grilla.style.display = "none";
    }
    public MostrarPorTipo():void
    {
        let tipo = <HTMLInputElement>Main.$("selectTipo");
        (<HTMLInputElement>Main.$("promedio")).value = "";
        if(tipo.value == "auto")
        {
            let aux = this.listaVh.filter(item => item instanceof Auto);
            this.ModificarColumnas(aux);
        }
        else if(tipo.value == "camioneta")
        {
            let aux = this.listaVh.filter(item => item instanceof Camioneta);
            this.ModificarColumnas(aux);
        }
        else
        {
            this.ModificarColumnas();
        }
    }
    public ModificarColumnas(lista?:Array<Vehiculo>):void
    {
        let cuerpo =<HTMLInputElement> Main.$("tCuerpo");
        let cabecera = <HTMLInputElement> Main.$("tCabecera");
        while(cabecera.hasChildNodes())
        {
            cabecera.removeChild(<Node>cabecera.lastChild);
        }
        while(cuerpo.hasChildNodes())
        {
            cuerpo.removeChild(<Node>cuerpo.lastChild);
        }
        if(lista == null)
        {
            this.listaVh.forEach(element => {
                this.CargarEnLista(element);
            });
        }
        else
        {
            lista.forEach(element => {
                this.CargarEnLista(element);
            });
        }
        
    }
    public MostrarTipos():void
    {
        let tipo = <HTMLInputElement>Main.$("gSelect");

        if(tipo.value == "auto")
        {
            (<HTMLInputElement>Main.$("selectAuto")).style.display = "block";
            (<HTMLInputElement>Main.$("selectCamioneta")).style.display = "none";
        }
        else if(tipo.value == "camioneta")
        {
            (<HTMLInputElement>Main.$("selectCamioneta")).style.display = "block";
            (<HTMLInputElement>Main.$("selectAuto")).style.display = "none";
        }
    }
    public RecuperarUltimoId():number
    {
        if(this.listaVh.length > 0)
        {
            let retorno = this.listaVh.reduce((idMax,item)=>{
                if(item.GetId > idMax)
                {
                    return item.GetId;
                }
                else
                {
                    return idMax;
                }
            },0);
            retorno++;
            return retorno;
        }
        return 1;
        
    }
    public Guardar():void
    {
        let marca =<HTMLInputElement> Main.$("gMarca");
        let modelo = <HTMLInputElement>Main.$("gModelo");
        let precio = <HTMLInputElement>Main.$("gPrecio");
        let tipo = <HTMLInputElement>Main.$("gSelect");
        let ingresoDatos = 0;

        if(marca.value == "")
        {
            marca.className = "inputGrilla error";
        }
        else
        {
            marca.className = "inputGrilla sinError";
            ingresoDatos ++;
        }

        if(modelo.value == "")
        {
            modelo.className = "inputGrilla error";
        }
        else
        {
            modelo.className = "inputGrilla sinError";
            ingresoDatos ++;
        }
        if(precio.value == "")
        {
            precio.className = "inputGrilla error";
            
        }
        else
        {
            precio.className = "inputGrilla sinError";
            ingresoDatos++;
        }

        if(tipo.value != "todos" && ingresoDatos == 3)
        {
            if(tipo.value == "auto")
            {
                let puertas =<HTMLInputElement> Main.$("cantidadPuertas");
                if(puertas.value.length > 0)
                {
                    let aux = new Auto(this.RecuperarUltimoId(),marca.value,modelo.value,parseInt(precio.value),parseInt(puertas.value));
                    this.listaVh.push(aux);
                    //cargar en la lista
                    this.CargarEnLista(aux);
                    this.CerrarGrilla();
                }
                else
                {
                    alert("Falta elegir cantidad de puertas");
                }
            }
            else if(tipo.value == "camioneta")
            {
                let es4x4 = <HTMLInputElement>Main.$("selectCuatroXcuatro");
                let noEs = false;
                if(es4x4.value == "es4x4")
                {
                    noEs = true;
                }
                let aux = new Camioneta(this.RecuperarUltimoId(),marca.value,modelo.value,parseInt(precio.value),noEs);
                this.listaVh.push(aux);
                this.CargarEnLista(aux);

                this.CerrarGrilla();
                //cargar en la lista
            }
        }
        else
        {
            alert("Falta llenar algun campo");
        }
        
        
    }
    public CargarEnLista(vh:Vehiculo):void
    {
        let tCuerpo = Main.$("tCuerpo");
        let tCabecera = Main.$("tCabecera");
        let trH = document.createElement("tr");
        let tr = document.createElement("tr");

        let seleccionoAlgo = 0;
        if((<HTMLInputElement>Main.$("mostrarId")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
                let th = document.createElement("th");
                trH.appendChild(th);
                let nodoH = document.createTextNode("Id");
                th.appendChild(nodoH);
            }

            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.GetId.toString());
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }

        if((<HTMLInputElement>Main.$("mostrarMarca")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Marca");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.GetMarca);
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }

        if((<HTMLInputElement>Main.$("mostrarModelo")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Modelo");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.GetModelo);
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }

        if((<HTMLInputElement>Main.$("mostrarPrecio")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Precio");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.GetPrecio.toString());
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }
        if(seleccionoAlgo)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Accion");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let eliminar = document.createElement("button");
            td.appendChild(eliminar);
            eliminar.id = "btnEliminar";
            
            let nodo = document.createTextNode("Eliminar");
            eliminar.appendChild(nodo);
            

            eliminar.addEventListener("click",this);

        }
        tCabecera.appendChild(trH);
        tCuerpo.appendChild(tr);
    }
    public EliminarId(id:number):boolean
    {
        
        for(let i=0;i<this.listaVh.length;i++)
        {
            if((<Vehiculo>this.listaVh[i]).GetId == id)
            {
                this.listaVh.splice(i,1);
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
    public CalcularPromedio():void
    {
        let seleccion = (<HTMLInputElement>Main.$("selectTipo")).value;

        let promedio:number;
        let contador = 0;
        let resultado;

        if(seleccion == "auto")
        {
            promedio = this.listaVh.filter(item => item instanceof Auto).reduce((total,item)=>{
                contador++;
                return total += item.GetPrecio;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
        else if(seleccion == "camioneta")
        {
            promedio = this.listaVh.filter(item => item instanceof Camioneta).reduce((total,item)=>{
                contador++;
                return total += item.GetPrecio;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
        else
        {
            promedio = this.listaVh.reduce((total,item)=>{
                contador++;
                return total += item.GetPrecio;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
    }
    public ListaInicial():void
    {

        if(this.listaVh.length == 0 )
        {
            let au1 = new Auto(this.RecuperarUltimoId(),"Ford","Mondeo",502120,4);
            
            this.listaVh.push(au1);

            let au2 = new Auto(this.RecuperarUltimoId(),"Fiat","Palio",305224,5);
            
            this.listaVh.push(au2);

            let au3 = new Auto(this.RecuperarUltimoId(),"Fiat","Siena",402120,4);
            
            this.listaVh.push(au3);

            let au4 = new Auto(this.RecuperarUltimoId(),"Vw","Fox",705822,3);
            
            this.listaVh.push(au4);

            let ca1 = new Camioneta(this.RecuperarUltimoId(),"Vw","Amarok",805562,true);
            
            this.listaVh.push(ca1);

            let ca2 = new Camioneta(this.RecuperarUltimoId(),"Ford","Ranger",1205562,false);
            
            this.listaVh.push(ca2);

            let ca3 = new Camioneta(this.RecuperarUltimoId(),"Rover","Range",2105562,true);
            
            this.listaVh.push(ca3);
            
            let ca4 = new Camioneta(this.RecuperarUltimoId(),"Doogge","Ram",2505562,true);
            
            this.listaVh.push(ca4);
            
        }
        this.ModificarColumnas();
    }
}