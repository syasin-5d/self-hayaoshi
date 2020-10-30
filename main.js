import('./read_csv.js');


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let question_str = "阪急阪神東宝グループ運営のお葬式のサービス業を主とする会社名と、ゲーム『スクールガールストライカーズ』で舞台となる拠点に共通する、イタリア語で「永遠」という意味がある言葉は何でしょう？";
let answer_str = "エテルノ";
let sleep_ms = 100; // [ms]
let is_pushed = 0;
let push_delay = 2; // [文字]
let thinking_time = 5; // [s]
let csv_array = []; // wish: [Question, Answer]
let sleep_delta = 10;


function say_question(question_text, ms){
    let question_elm = document.getElementById('question');
    let remain_delay = push_delay;
    (async () => {
        for(let i = 0; i <= question_text.length; ++i){
            put_question(question_text.slice(0,i));
                if(is_pushed){
                    if(remain_delay > 0){
                        --remain_delay;
                    }else{
                        break;
                    }
                }
            await sleep(ms);
        }
        if(is_pushed === 0){
            ++is_pushed;
        }
        after_pushed();
    })();
}

function show_question(){
    initialize();
    say_question(question_str, sleep_ms);
}

function set_question_and_answer(csv_array, number){
    // number is 1-based instead of 0-based index
    question_str = csv_array[number-1][0];
    answer_str = csv_array[number-1][1];

}


function put_question(question){
    document.getElementById("question").textContent = question;
}

function put_answer(answer){
    document.getElementById("answer").textContent = answer;
}

function initialize(){
    put_question("");
    put_answer(`TIME: ${thinking_time}`);
    is_pushed = 0;
}

function push_button(){
    ++is_pushed;
}

function change_sleep_ms(){
    sleep_ms = document.getElementById("input_sleep_ms").value;
    document.getElementById("now_sleep_ms").textContent = sleep_ms;
}

function change_push_delay(){
    push_delay = document.getElementById("input_push_delay").value;
    document.getElementById("now_push_delay").textContent = push_delay;
}

function change_question_number(){
    let question_number = document.getElementById("input_question_number").value;
    document.getElementById('current_question_number').textContent = question_number;
    set_question_and_answer(csv_array, question_number);
}



function after_pushed(){
    answer_elm = document.getElementById("answer");
    (async () => {
        for(let i = thinking_time; i >= 0 && is_pushed <= 1; --i){
            answer_elm.textContent = `TIME: ${i}`;
            for (let iter = 0; iter < sleep_delta; ++iter){
                if(is_pushed >= 2){
                    break;
                }
                await sleep(1000 / sleep_delta);
            }
        }
        put_answer(answer_str);
    })();


}

