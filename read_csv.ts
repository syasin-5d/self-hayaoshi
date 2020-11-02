let file_name :string = 'question_csv';
let question_csv_elem :HTMLElement | null = document.getElementById(file_name);

function csv_to_text(file_data :File){
    return new Promise(resolve => {
        let file_reader :FileReader = new FileReader();
        file_reader.readAsText(file_data);
        file_reader.onload = () => {
            resolve(file_reader.result);
        };
    });
}

function convert_csv_to_array(csv_text :string){
    let csv_array = [];
    let csv_lines = csv_text.split("\n");

    for (const line of csv_lines){
        csv_array.push(line.split(','));
    }
    return csv_array;
}

function load_csv(e :Event){
    let file_data_elm :HTMLInputElement = e.target as HTMLInputElement;

    if (file_data_elm.files == null) {
        return;
    }

    let file_data :File = file_data_elm.files[0];

    if(!file_data.name.match('.csv$')){
        alert('csv ファイルを選択してください');
        return;
    }

    (async () =>{
        let text :string = await csv_to_text(file_data) as string;
        let num_of_questions_elm : Element | null = document.getElementById('num_of_questions');
        csv_array = convert_csv_to_array(text).filter(array => array.length == 2); // must be question and answer;

        num_of_questions_elm!.textContent = csv_array.length.toString();
    })();
}

function get_csv_array(){
    return csv_array;
}

if (question_csv_elem != null){
    question_csv_elem.addEventListener('change', load_csv, false);
}

