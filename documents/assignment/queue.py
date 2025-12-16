# queue.py
# Queue implementation in Python (using list)

class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, item):
        self.queue.append(item)
        print(f"Enqueued: {item}")

    def dequeue(self):
        if self.is_empty():
            print("Queue is empty. Cannot dequeue.")
        else:
            removed = self.queue.pop(0)
            print(f"Dequeued: {removed}")

    def peek(self):
        if self.is_empty():
            print("Queue is empty. Nothing to peek.")
        else:
            print(f"Front element: {self.queue[0]}")

    def is_empty(self):
        return len(self.queue) == 0

    def display(self):
        print("Queue elements:", self.queue)


# ----- Main Program -----
if __name__ == "__main__":
    q = Queue()
    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    q.display()
    q.peek()
    q.dequeue()
    q.display()
