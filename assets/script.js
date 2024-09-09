let tarefas = [];
        let idContador = 1;

        function adicionarTarefa() {
            const nomeTarefa = document.getElementById('titulo').value;
            if (nomeTarefa === '') {
                alert('Por favor, insira o nome da tarefa.');
                return;
            }
            tarefas.push({ id: idContador++, nome: nomeTarefa, status: 'pendente' });
            renderizarTarefas();
            document.getElementById('titulo').value = '';
        }

        function renderizarTarefas() {
            const elementoUl = document.getElementById('tarefas');
            elementoUl.innerHTML = '';
            tarefas.forEach((tarefa) => {
                const elementoLi = document.createElement('li');
                elementoLi.style.listStyleType = 'none';

                const tarefaContainer = document.createElement('div');
                tarefaContainer.classList.add('tarefa-container');

                const tarefaInfo = document.createElement('div');
                tarefaInfo.classList.add('tarefa-info');

                const textoTarefa = document.createElement('span');
                textoTarefa.innerText = `ID: ${tarefa.id} - ${tarefa.nome}`;

                const statusSpan = document.createElement('span');
                statusSpan.innerText = ` - ${tarefa.status}`;
                statusSpan.classList.add(tarefa.status === 'pendente' ? 'pendente' : 'concluida');

                tarefaInfo.appendChild(textoTarefa);
                tarefaInfo.appendChild(statusSpan);

                const tarefaBotoes = document.createElement('div');
                tarefaBotoes.classList.add('tarefa-botoes');

                const botaoEditar = document.createElement('button');
                botaoEditar.innerText = 'Editar';
                botaoEditar.onclick = () => editarTarefa(tarefa.id);

                const botaoRemover = document.createElement('button');
                botaoRemover.innerText = 'Remover';
                botaoRemover.onclick = () => removerTarefa(tarefa.id);

                const botaoCompletar = document.createElement('button');
                botaoCompletar.innerText = tarefa.status === 'pendente' ? 'Completar' : 'Marcar como pendente';
                botaoCompletar.onclick = () => salvarTarefa(tarefa.id);

                tarefaBotoes.appendChild(botaoEditar);
                tarefaBotoes.appendChild(botaoRemover);
                tarefaBotoes.appendChild(botaoCompletar);

                tarefaContainer.appendChild(tarefaInfo);
                tarefaContainer.appendChild(tarefaBotoes);
                elementoLi.appendChild(tarefaContainer);
                elementoUl.appendChild(elementoLi);
            });
        }

        function buscarTarefaPorId() {
            const id = parseInt(document.getElementById('searchId').value, 10);
            const tarefa = tarefas.find(t => t.id === id);
            const divTarefaEncontrada = document.getElementById('tarefaEncontrada');
            divTarefaEncontrada.innerText = tarefa ? `Tarefa encontrada:\nID: ${tarefa.id}\nNome: ${tarefa.nome}\nStatus: ${tarefa.status}` : 'Tarefa não encontrada.';
        }

        function editarTarefa(id) {
            const tarefa = tarefas.find(t => t.id === id);
            const novoNome = prompt('Digite o novo nome da tarefa:', tarefa.nome);
            if (novoNome !== null && novoNome.trim() !== '') {
                tarefa.nome = novoNome;
                renderizarTarefas();
            }
        }

        function removerTarefa(id) {
            tarefas = tarefas.filter(t => t.id !== id);
            renderizarTarefas();
        }

        function salvarTarefa(id) {
            const tarefa = tarefas.find(t => t.id === id);
            tarefa.status = tarefa.status === 'pendente' ? 'completa' : 'pendente';
            renderizarTarefas();
        }