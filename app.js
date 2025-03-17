// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

class AmigoSecreto {
    constructor() {
        this.listaAmigos = [];
        this.inputAmigo = document.getElementById('amigo');
        this.listaAmigosElemento = document.getElementById('listaAmigos');
        this.resultadoElemento = document.getElementById('resultado');
    }

    agregarAmigo() {
        const nombre = this.inputAmigo.value.trim();

        if (!nombre) {
            alert('Por favor, ingrese un nombre válido.');
            console.error('Intento de agregar un nombre vacío.');
            return;
        }
        
        if (/\d/.test(nombre)) {
            alert('El nombre no puede contener números.');
            console.error(`Intento de agregar un nombre con números: ${nombre}`);
            return;
        }
        
        if (this.listaAmigos.includes(nombre)) {
            alert('Este nombre ya ha sido agregado.');
            console.warn(`Intento de agregar un nombre duplicado: ${nombre}`);
            return;
        }
        
        if (nombre.length < 2 || nombre.length > 30) {
            alert('El nombre debe tener entre 2 y 30 caracteres.');
            console.warn(`Intento de agregar un nombre con longitud inválida: ${nombre.length} caracteres.`);
            return;
        }

        this.listaAmigos.push(nombre);
        this.actualizarLista();
        this.inputAmigo.value = '';
        this.inputAmigo.focus();
    }

    actualizarLista() {
        this.listaAmigosElemento.innerHTML = '';

        this.listaAmigos.forEach((amigo, index) => {
            const li = document.createElement('li');
            li.textContent = amigo;
            li.classList.add('lista-item');

            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = '❌';
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.onclick = () => this.eliminarAmigo(index);

            li.appendChild(btnEliminar);
            this.listaAmigosElemento.appendChild(li);
        });
    }

    eliminarAmigo(index) {
        this.listaAmigos.splice(index, 1);
        this.actualizarLista();
    }

    sortearAmigo() {
        if (this.listaAmigos.length < 2) {
            alert('Debe haber al menos dos nombres en la lista para sortear.');
            console.warn('Intento de sorteo con menos de dos participantes.');
            return;
        }
        
        let indiceAleatorio;
        let amigoSecreto;

        do {
            indiceAleatorio = Math.floor(Math.random() * this.listaAmigos.length);
            amigoSecreto = this.listaAmigos[indiceAleatorio];
        } while (this.listaAmigos.length === 2 && this.listaAmigos.indexOf(amigoSecreto) === 0);

        this.resultadoElemento.innerHTML = `<li>El amigo secreto es: <strong>${amigoSecreto}</strong></li>`;
    }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const app = new AmigoSecreto();
    document.querySelector('.button-add').addEventListener('click', () => app.agregarAmigo());
    document.querySelector('.button-draw').addEventListener('click', () => app.sortearAmigo());
    document.getElementById('amigo').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            app.agregarAmigo();
        }
    });
});
