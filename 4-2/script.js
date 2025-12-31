// 4-2 機能実装: ハンバーガー, FAQ, モーダル, タブ, ロゴ自動スクロールを実装してください
//ハンバーガーメニュー実装
//ハンバーガーメニューに必要なidを取得
const hamburger = document.querySelector('.hamburger');
const globalNav = document.getElementById('global-nav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';  //--ハンバーガーメニューが、開いているかどうか判定


  // aria-expanded を切り替え
     hamburger.setAttribute('aria-expanded', String(!isOpen));   //--ハンバーガーメニューの開閉状態を反転させ、.aria-expandedの属性の変更を実施
  
     // ナビの表示切り替え
     globalNav.classList.toggle('is-open');    //--.globalNavに.is-openが付与されているかを判断し、.is-openの追加・削除を実施(if文でも対応可)
    });

//タブ切り替えコンポーネント実装
//タブ切り替えコンポーネントに必要なidを取得
const tabs = document.getElementById('demo-tabs');
const tabButtons = tabs.querySelectorAll('.tab-btn');
const tabPanels = tabs.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tab;

      // ボタンの状態リセット
      tabButtons.forEach(btn => {
        btn.classList.remove('is-active');  //--.is-active状態のclassを削除
        btn.setAttribute('aria-selected', 'false');  //--.aria-selected属性をfalseに設定(タブボタンが選択されていないことを示す)
      });

       // パネルの状態リセット
       tabPanels.forEach(panel => {
        panel.classList.remove('is-active');   //--.is-active状態のclassを削除
      });

       // クリックされたタブをアクティブに
       button.classList.add('is-active');            //--buttonに.is-activeを付与
       button.setAttribute('aria-selected', 'true');   //--選択したbuttonに.is-activeを選択したことをスクリーンリーダーで読み取るため

        // 対応するパネルを表示
      const targetPanel = tabs.querySelector(`#${targetId}`);  //--id=tab2を持つ最初の一要素を取得
      if (targetPanel) {
        targetPanel.classList.add('is-active');     //--選択したパネルを表示状態にする(UIが壊れないようにするための保険)
      }
    });
  });


// モーダル機能実装
//モーダル機能に必要なidを取得
const openBtn = document.getElementById("open-modal");   //--モーダルを開くボタンidを取得--
const modal = document.getElementById("demo-modal");     //--モーダルの全体を取得（モーダルの本体になる変数）--
const closeTargets = modal.querySelectorAll("[data-close]");  //--「閉じる役割を持つすべての要素」をまとめて取得--
const body = document.body;      //--body要素を全取得(モーダル中の背景スクロール制御のため)--

// モーダルを開く
function openModal() {
    modal.setAttribute("aria-hidden", "false");      //--スクリーンリーダーにてモーダル機能が表示されていることを伝えるため--
    openBtn.setAttribute("aria-expanded", "true");   //--ボタンを押すことで開いている状態を示す--
    modal.classList.add("is-open");     //--見た目の制御--

      // 背景スクロール禁止
      body.style.overflow = "hidden";

      // フォーカスをモーダル内へ
    modal.querySelector(".modal-dialog").focus();   //--モーダルが開いた時に主導権がモーダルの中に移る--
}

 // モーダルを閉じる
 function closeModal() {
    modal.setAttribute("aria-hidden", "true");    //--スクリーンリーダーにモーダルが見えなくなったことを伝えるため--
    openBtn.setAttribute("aria-expanded", "false");    //--このボタンは閉じている状態を示す--
    modal.classList.remove("is-open");     //--見た目の制御解除--

    body.style.overflow = "";    //--open modalで背景スクロールの制限を実施していたのを解除--

     // フォーカスを元のボタンへ戻す
     openBtn.focus();    //--モーダルを閉じた後のキーボード操作の戻り先の明確化--
    }

     // 開くボタン
  openBtn.addEventListener("click", openModal);  //--ボタンをクリックすることでモーダルを開くことを実施--

   // 閉じる要素（✖️ / overlay / 閉じるボタン）
   closeTargets.forEach((el) => {
    el.addEventListener("click", closeModal);    //--closa modalを持つ要素すべてに閉じる処理を実行--
  });

   // ESCキーで閉じる
   document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // モーダル以外を押下し閉じる
  modal.addEventListener("click", (e) => {
    const dialog = modal.querySelector(".modal-dialog");
  
    if (!dialog.contains(e.target)) {
      closeModal();
    }
  });

  // FAQ アコーディオン実装
  // FAQ アコーディオン機能に必要なidを取得
  const faqItems = document.querySelectorAll(".faq-item");   //--.faq-itemをすべて取得

  // .faq-itemを一つずつ処理して、itemを取得
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");  //--.faq-questionを取得
    const answer = item.querySelector(".faq-answer");  //--.faq-answerを取得

    // 初期状態は非表示
    answer.style.display = "none";  //--.faq-answerを非表示にする

    question.addEventListener("click", () => {
      const isOpen = answer.style.display === "block";  //--.faq-questionをクリックすると、.faq-answerが表示されるかどうか判断する。

       // クリックしたものだけ開く
       if (isOpen) {       //--.faq-answerの条件分岐
        answer.style.display = "none";  //--.faq-answerが開いていたら、閉じる
        item.classList.remove("is-open");   //--.is-openを削除
      } else {
        // 閉じていたら開く
        answer.style.display = "block";   //--.faq-answerが閉じていたら、開く
        item.classList.add("is-open");    //--.is-openを追加
      }
    });
  });

  //ロゴリストの自動横スクロールの実装
  const slider = document.querySelector(".logos-rail");   //--ロゴリストの自動横スクロールに必要なuiを取得
  const speed = 0.5; //--ロゴが動くスピードを調整(数値を大きくすると速くなる)

  // ロゴを複製して無限ループにする
  slider.innerHTML += slider.innerHTML;   //--ulタグの複製を作成

  let position = 0;    //--ロゴの位置を設定
  const totalWidth = slider.scrollWidth / 2;   //--リセットをするタイミングを設定

  function animate() {
    position -= speed;     //--左に流すように設定(+は右に、-は左に)

    if (Math.abs(position) >= totalWidth) {       //--ロゴ1セット分左に流したら
      position = 0;          //--元の位置に戻す
    }

    slider.style.transform = `translateX(${position}px)`;     //--現在のpositionの値だけ横移動を実施
    requestAnimationFrame(animate);      //--再度フレーム呼び出し
  }

  animate();   //--アニメーションの初期値を配置