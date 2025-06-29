import { Component } from 'react'

interface ToasterState {
  toasts: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }>
}

class Toaster extends Component<{}, ToasterState> {
  state: ToasterState = {
    toasts: []
  }

  render() {
    const { toasts } = this.state

    if (toasts.length === 0) return null

    return (
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white ${
              toast.type === 'success' ? 'bg-green-600' :
              toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    )
  }
}

export default Toaster