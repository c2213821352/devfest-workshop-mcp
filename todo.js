// todo.js — 简易代办（基于 localStorage）
(function(){
  const STORAGE_KEY = 'devfest_todos_v1';
  let tasks = [];

  function loadTasks(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ console.error('无法读取任务', e); return []; }
  }

  function saveTasks(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function renderTasks(){
    const tbody = document.getElementById('todo-body');
    if(!tbody) return;
    tbody.innerHTML = '';
    tasks.forEach(task => {
      const tr = document.createElement('tr');

      // 完成列
      const tdDone = document.createElement('td');
      tdDone.style.padding = '8px';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!task.done;
      cb.addEventListener('change', ()=> toggleDone(task.id));
      tdDone.appendChild(cb);
      tr.appendChild(tdDone);

      // 任务描述
      const tdTitle = document.createElement('td');
      tdTitle.style.padding = '8px';
      tdTitle.textContent = task.title;
      if(task.done) tdTitle.classList.add('todo-completed');
      tr.appendChild(tdTitle);

      // 到期
      const tdDue = document.createElement('td');
      tdDue.style.padding = '8px';
      tdDue.textContent = task.due || '';
      tr.appendChild(tdDue);

      // 优先级
      const tdPri = document.createElement('td');
      tdPri.style.padding = '8px';
      tdPri.textContent = (task.priority || 'medium');
      tr.appendChild(tdPri);

      // 操作
      const tdAct = document.createElement('td');
      tdAct.style.padding = '8px';
      const btnEdit = document.createElement('button');
      btnEdit.textContent = '编辑';
      btnEdit.className = 'button';
      btnEdit.style.marginRight = '8px';
      btnEdit.addEventListener('click', ()=> editTask(task.id));

      const btnDel = document.createElement('button');
      btnDel.textContent = '删除';
      btnDel.className = 'button';
      btnDel.addEventListener('click', ()=> deleteTask(task.id));

      tdAct.appendChild(btnEdit);
      tdAct.appendChild(btnDel);
      tr.appendChild(tdAct);

      tbody.appendChild(tr);
    });
  }

  function addTask(title, due, priority){
    const t = { id: Date.now(), title: title.trim(), due: due || '', priority: priority || 'medium', done: false };
    tasks.unshift(t);
    saveTasks();
    renderTasks();
  }

  function toggleDone(id){
    tasks = tasks.map(t => t.id === id ? Object.assign({}, t, {done: !t.done}) : t);
    saveTasks();
    renderTasks();
  }

  function editTask(id){
    const t = tasks.find(x=>x.id===id);
    if(!t) return;
    const newTitle = prompt('编辑任务描述', t.title);
    if(newTitle === null) return; // 取消
    const newDue = prompt('编辑到期日期（YYYY-MM-DD，留空为无）', t.due || '') || '';
    const newPri = prompt('优先级 (low/medium/high)', t.priority || 'medium') || t.priority;
    t.title = newTitle.trim() || t.title;
    t.due = newDue.trim();
    t.priority = newPri.trim() || t.priority;
    saveTasks(); renderTasks();
  }

  function deleteTask(id){
    if(!confirm('确定删除此任务？')) return;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }

  function clearCompleted(){
    tasks = tasks.filter(t => !t.done);
    saveTasks(); renderTasks();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    tasks = loadTasks();
    renderTasks();

    const form = document.getElementById('todo-form');
    form && form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const title = document.getElementById('task-title').value;
      const due = document.getElementById('task-due').value;
      const pri = document.getElementById('task-priority').value;
      if(!title || !title.trim()){ alert('请填写任务描述'); return; }
      addTask(title, due, pri);
      form.reset();
      // 保持优先级中为中
      document.getElementById('task-priority').value = 'medium';
    });

    const clearBtn = document.getElementById('clear-completed');
    clearBtn && clearBtn.addEventListener('click', clearCompleted);
  });

})();
