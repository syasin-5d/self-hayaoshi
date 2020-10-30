let file_name = 'question_csv';
let question_csv_elem = document.getElementById(file_name);

function csv_to_text(file_data){
    return new Promise(resolve => {
        let file_reader = new FileReader();
        file_reader.readAsText(file_data);
        file_reader.onload = () => {
            resolve(file_reader.result);
        };
    });
}

function convert_csv_to_array(csv_text){
    let csv_array = [];
    let csv_lines = csv_text.split("\n");

    for (const line of csv_lines){
        csv_array.push(line.split(','));
    }
    return csv_array;
}

function load_csv(e){
    let file_data = e.target.files[0];

    if(!file_data.name.match('.csv$')){
        alert('csv ファイルを選択してください');
        return;
    }

    (async () =>{
        let text = await csv_to_text(file_data);
        csv_array = convert_csv_to_array(text).filter(array => array.length == 2); // must be question and answer;
        document.getElementById('num_of_questions').textContent = csv_array.length;
    })();
}

function get_csv_array(){
    return csv_array;
}

question_csv_elem.addEventListener('change', load_csv, false);
