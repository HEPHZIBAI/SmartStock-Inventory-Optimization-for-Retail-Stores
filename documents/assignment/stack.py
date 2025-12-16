# stack.py
# Stack implementation in Python (using list)

class Stack:
    def __init__(self):
        self.stack = []

    def push(self, item):
        self.stack.append(item)
        print(f"Pushed: {item}")

    def pop(self):
        if self.is_empty():
            print("Stack is empty. Cannot pop.")
        else:
            removed = self.stack.pop()
            print(f"Popped: {removed}")

    def peek(self):
        if self.is_empty():
            print("Stack is empty. Nothing to peek.")
        else:
            print(f"Top element: {self.stack[-1]}")

    def is_empty(self):
        return len(self.stack) == 0

    def display(self):
        print("Stack elements:", self.stack)


# ----- Main Program -----
if __name__ == "__main__":
    s = Stack()
    s.push(10)
    s.push(20)
    s.push(30)
    s.display()
    s.peek()
    s.pop()
    s.display()