 const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 let question_str = "阪急阪神東宝グループ運営のお葬式のサービス業を主とする会社名と、ゲーム『スクールガールストライカーズ』で舞台となる拠点に共通する、イタリア語で「永遠」という意味がある言葉は何でしょう？";
 let answer_str = "エテルノ";
 let sleep_ms = 10; // [ms]
 let is_pushed = false;
 let push_delay = 2; // [文字]
 let thinking_time = 5; // [s]


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
         after_pushed();
     })();
 }

 function show_question(){
     initialize();
     say_question(question_str, sleep_ms);
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
     is_pushed = false;
 }

 function push_button(){
     is_pushed = true;
 }

 function change_sleep_ms(){
     sleep_ms = document.getElementById("input_sleep_ms").value;
     document.getElementById("now_sleep_ms").textContent = sleep_ms;
 }

 function change_push_delay(){
     push_delay = document.getElementById("input_push_delay").value;
     document.getElementById("now_push_delay").textContent = push_delay;
 }

 function after_pushed(){
     answer_elm = document.getElementById("answer");
     (async () => {
         for(let i = thinking_time; i >= 0; --i){
             answer_elm.textContent = `TIME: ${i}`;
             await sleep(1000);
         }
         put_answer(answer_str);
     })();

 }
