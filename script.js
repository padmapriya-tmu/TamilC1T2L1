const answers = {q1:"b",q2:"a",q3:"b",q4:"d",q5:"a"};
const correctText = {
  q1:"ஆ) பெயர் + இல்லாத",
  q2:"அ) கீழே",
  q3:"ஆ) உயிரற்ற பொருள்",
  q4:"ஈ) அசையில்லை",
  q5:"அ) நாளும்"
};

const form=document.getElementById("quizForm");
const bar=document.getElementById("progressBar");
const progressText=document.getElementById("progressText");
const result=document.getElementById("result");

function updateProgress(){
  let count=0;
  for(let i=1;i<=5;i++){
    if(document.querySelector(`input[name="q${i}"]:checked`)) count++;
  }
  bar.style.width=(count*20)+"%";
  progressText.textContent=`${count} / 5`;
}
document.querySelectorAll("input").forEach(x=>x.addEventListener("change",updateProgress));

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  let score=0, review="";
  for(let i=1;i<=5;i++){
    const selected=document.querySelector(`input[name="q${i}"]:checked`);
    if(selected && selected.value===answers["q"+i]){
      score++;
      review+=`<div class="review-item good">✓ வினா ${String(i).padStart(2,"0")} — சரியான விடை</div>`;
    }else{
      const chosen=selected ? selected.parentElement.innerText : "விடை தெரிவு செய்யப்படவில்லை";
      review+=`<div class="review-item bad">✗ வினா ${String(i).padStart(2,"0")} — உங்கள் விடை: ${chosen}<br>சரியான விடை: <strong>${correctText["q"+i]}</strong></div>`;
    }
  }

  let title,remarks,emoji;
  if(score===5){
    title="அருமை! முழு மதிப்பெண்! 🎉";
    remarks="உங்கள் தமிழ் அறிவு மிகவும் சிறப்பாக உள்ளது!";
    emoji="🏆";
  }else if(score===4){
    title="மிகச் சிறப்பு! 👏";
    remarks="நன்றாகச் செய்துள்ளீர்கள். இன்னும் ஒரு படி முன்னேறுங்கள்!";
    emoji="🌟";
  }else if(score===3){
    title="நல்ல முயற்சி! 😊";
    remarks="நல்ல தொடக்கம். தவறான விடைகளை மீண்டும் பயிற்சி செய்யுங்கள்.";
    emoji="👍";
  }else{
    title="மீண்டும் முயற்சி செய்யுங்கள்! 💪";
    remarks="பாடத்தை மீண்டும் படித்து முயற்சி செய்தால் நிச்சயம் வெற்றி பெறலாம்!";
    emoji="📚";
  }

  document.getElementById("emoji").textContent=emoji;
  document.getElementById("resultTitle").textContent=title;
  document.getElementById("score").textContent=score;
  document.getElementById("remarks").textContent=remarks;
  document.getElementById("review").innerHTML=review;
  result.classList.remove("hidden");
  result.scrollIntoView({behavior:"smooth",block:"start"});
});

document.getElementById("retry").addEventListener("click",()=>{
  form.reset();
  result.classList.add("hidden");
  updateProgress();
  window.scrollTo({top:0,behavior:"smooth"});
});
updateProgress();
