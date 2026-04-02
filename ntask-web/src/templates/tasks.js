const renderTasks = (tasks) => {
  return tasks
    .map((task) => {
      const doneIcon = task.done ? 'ion-ios-checkmark' : 'ion-ios-circle-outline'

      return `<li class="item item-icon-left item-button-right">
      <i class="icon ${doneIcon}" data-done data-task-done="${task.done}" data-task-id="${task.id}"></i>
      ${task.title}
      <button data-remove data-task-id="${task.id}"
      class="button button-assertive">
      <i class="ion-trash-a"></i>
      </button>
    </li>`
    })
    .join('')
}

exports.render = (tasks) => {
  if (Array.isArray(tasks) && tasks.length) {
    return `<ul class='list'> ${renderTasks(tasks)}</ul>`
  }
  return `<h4 class='text-center'> Nenhuma tarefa ainda</h4>`
}
