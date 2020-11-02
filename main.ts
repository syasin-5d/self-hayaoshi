// import('./read_csv.js');

const sleep = (ms :number) => new Promise((resolve) => setTimeout(resolve, ms));

let question_str :string = "阪急阪神東宝グループ運営のお葬式のサービス業を主とする会社名と、ゲーム『スクールガールストライカーズ』で舞台となる拠点に共通する、イタリア語で「永遠」という意味がある言葉は何でしょう？";
let answer_str :string = "エテルノ";
let sleep_ms :number = 100; // [ms]
type pushed_mode = 0 | 1 | 2;
let is_pushed :pushed_mode = 0
let push_delay :number = 2; // [文字]
let thinking_time :number = 5; // [s]
let csv_array :string[][] = []; // wish: [Question][Answer]
let sleep_delta :number = 10;


function say_question(question_text :string, ms :number){
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

function set_question_and_answer(csv_array :string[][], num :number){
    // number is 1-based instead of 0-based index
    question_str = csv_array[num-1][0];
    answer_str = csv_array[num-1][1];
}

function put_question(question :string){
    document.getElementById("question")!.textContent = question;
}

function put_answer(answer :string){
    document.getElementById("answer")!.textContent = answer;
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
    let sleep_ms :number = parseInt((document.getElementById("input_sleep_ms") as HTMLInputElement).value);
    document.getElementById("now_sleep_ms")!.textContent = sleep_ms.toString();
}

function change_push_delay(){
    let push_delay :number = parseInt((document.getElementById("input_push_delay") as HTMLInputElement).value);
    document.getElementById("now_push_delay")!.textContent = push_delay.toString();
}

function change_question_number(){
    let question_number :number = parseInt((document.getElementById("input_question_number") as HTMLInputElement).value);
    document.getElementById('current_question_number')!.textContent = question_number.toString();
    set_question_and_answer(csv_array, question_number);
}

function after_pushed(){
    let answer_elm :Element | null = document.getElementById("answer");
    (async () => {
        for(let i = thinking_time; i >= 0 && is_pushed <= 1; --i){
            answer_elm!.textContent = `TIME: ${i}`;
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

