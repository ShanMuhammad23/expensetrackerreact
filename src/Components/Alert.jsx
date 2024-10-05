
const Alert = ({message,type}) => {
  return (
    <div className="absolute h-full w-full z-40 flex items-center justify-center">
    <div class=" py-8 transition-opacity text-2xl z-40 flex  items-center p-4 mb-4 text-green-600 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <svg class="flex-shrink-0 inline h-8 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">{type}</span>
  <div>
    <span class="font-medium">{message}</span>.
  </div>
</div>
</div>
  )
}

export default Alert
