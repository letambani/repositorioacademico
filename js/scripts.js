document.getElementById('course').addEventListener('change', function() {
    const phaseSelect = document.getElementById('phase');
    phaseSelect.innerHTML = '<option value="" disabled selected>Selecione a fase</option>';

    const phases = {
        ads: ['1ª Fase', '2ª Fase', '3ª Fase', '4ª Fase', '5ª Fase'],
        other: ['1ª Fase', '2ª Fase', '3ª Fase', '4ª Fase', '5ª Fase', '6ª Fase', '7ª Fase', '8ª Fase']
    };

    const selectedCourse = this.value;
    const options = selectedCourse === 'ads' ? phases.ads : phases.other;

    options.forEach((phase, index) => {
        const option = document.createElement('option');
        option.value = `${index + 1}fase`;
        option.textContent = phase;
        phaseSelect.appendChild(option);
    });
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio padrão do formulário
    
    const course = document.getElementById("course").value;
    const phase = document.getElementById("phase").value;

    console.log(`Curso selecionado: ${course}`);
    console.log(`Fase selecionada: ${phase}`);

    if (course && phase) {
        const targetTabId = `${course}-tab`;
        const targetTabPaneId = `${course}-tab-pane`;

        console.log(`ID da aba alvo: ${targetTabId}`);
        console.log(`ID do painel alvo: ${targetTabPaneId}`);

        // Ativar a aba correta
        const targetTab = document.getElementById(targetTabId);
        const targetTabPane = document.getElementById(targetTabPaneId);

        if (!targetTab || !targetTabPane) {
            console.error('A aba ou o painel alvo não foram encontrados.');
            return;
        }

        // Remove a classe 'active' de todas as abas e painéis
        const tabs = document.querySelectorAll('.nav-link');
        const tabPanes = document.querySelectorAll('.tab-pane');
        tabs.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(tabPane => tabPane.classList.remove('show', 'active'));

        // Adiciona a classe 'active' à aba e ao painel alvo
        targetTab.classList.add('active');
        targetTabPane.classList.add('show', 'active');

        // Rolagem suave até a seção
        document.querySelector('#section_2').scrollIntoView({ behavior: 'smooth' });

        // Filtrar os cartões de software com base na fase selecionada
        const softwareCards = targetTabPane.querySelectorAll('.custom-block');
        let anyVisible = false;

        softwareCards.forEach(card => {
            const badge = card.querySelector('.badge');
            console.log(`Verificando o cartão: ${card.querySelector('h5').textContent}, badge: ${badge ? badge.textContent : 'nenhuma'}`);

            // Verifica se deve mostrar todos os cartões ou apenas os da fase selecionada
            if (phase === 'todas' || (badge && badge.classList.contains(`bg-${phase}`))) {
                card.style.display = 'block';
                anyVisible = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!anyVisible) {
            console.log('Nenhum cartão encontrado para a fase selecionada.');
        }
    } else {
        alert("Por favor, selecione um curso e uma fase.");
    }
});