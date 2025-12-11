document.addEventListener('DOMContentLoaded', function() {
  // 將標籤雲依據 data-percent 由大到小排序
  const tagCloud = document.querySelector('.tag-cloud');
  if (tagCloud) {
    const tags = Array.from(tagCloud.querySelectorAll('.tag'));
    tags.sort((a, b) => {
      const pa = parseInt(a.getAttribute('data-percent') || '0', 10);
      const pb = parseInt(b.getAttribute('data-percent') || '0', 10);
      return pb - pa; // 由大到小
    });
    tags.forEach(t => tagCloud.appendChild(t));
  }
  // 平滑滾動到各區塊
  document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  // 聯絡方式複製 email
  const emailElement = document.getElementById('email');
  if (emailElement) {
    emailElement.addEventListener('click', function() {
      navigator.clipboard.writeText(emailElement.textContent);
      alert('Email 已複製到剪貼簿！');
    });
  }
  // 複製電話
  const phoneElement = document.getElementById('phone');
  if (phoneElement) {
    phoneElement.addEventListener('click', function() {
      navigator.clipboard.writeText(phoneElement.textContent);
      alert('電話已複製到剪貼簿！');
    });
  }
  
  // 複製 Instagram
  const igElement = document.getElementById('instagram');
  if (igElement) {
    igElement.addEventListener('click', function() {
      navigator.clipboard.writeText(igElement.textContent);
      alert('Instagram 帳號已複製到剪貼簿！');
    });
  }
  // 進場動畫：使用 IntersectionObserver 加入 .in-view
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // 若不需重複觸發可 unobserve
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.timeline-item, .card').forEach(el => io.observe(el));
});
