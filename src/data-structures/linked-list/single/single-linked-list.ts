class ListNode<T> {
  value: T;
  next: ListNode<T> | null | undefined;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export default class SingleLinkedList<T> {
  head: ListNode<T> | null | undefined;
  tail: ListNode<T> | null | undefined;
  length: number;

  constructor(initialNodeValue?: T | null) {
    if (initialNodeValue) {
      const initialListNode = new ListNode(initialNodeValue);
      this.head = initialListNode;
      this.tail = initialListNode;
      this.length = 1;
    } else {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  }

  push(value: T): ListNode<T> | null | undefined {
    const newListNode = new ListNode(value);
    if (!this.tail) {
      this.head = newListNode;
      this.tail = newListNode;
    } else {
      this.tail.next = newListNode;
      this.tail = newListNode;
    }
    this.length++;
    return newListNode;
  }

  pop(): ListNode<T> | null | undefined {
    if (!this.head) return null;

    const poppedValue = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next!;
      }
      current.next = null;
      this.tail = current;
    }
    this.length--;
    return poppedValue;
  }

  shift(): ListNode<T> | null | undefined {
    if (!this.head) return null;

    const shiftedValue = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
    }
    this.length--;
    return shiftedValue;
  }

  unshift(value: T): ListNode<T> {
    const unshiftNode = new ListNode(value);

    if (!this.head) {
      this.head = unshiftNode;
      this.tail = unshiftNode;
    }

    unshiftNode.next = this.head;
    this.head = unshiftNode;
    this.length++;

    return unshiftNode;
  }

  get(index: number): ListNode<T> | null | undefined {
    if (!this.head || index < 0 || index > this.length) return null;

    let initialIndex = 0;
    let currentNode = this.head;

    while (initialIndex <= index) {
      currentNode = this.head.next!;
      initialIndex++;
    }

    return currentNode;
  }

  set(index: number, value: T) {
    if (!this.head || index < 0 || index > this.length) return null;

    const nodeAtIndex = this.get(index);

    if (nodeAtIndex) {
      nodeAtIndex.value = value;
    }
  }

  insert(index: number, value: T): ListNode<T> | null | undefined {
    if (!this.head || index < 0 || index > this.length) return null;

    if (index === 0) return this.unshift(value);
    if (index === this.length - 1) return this.push(value);

    const insertNode = new ListNode(value);
    const previousNode = this.get(index - 1);

    if (previousNode) {
      insertNode.next = previousNode.next;
      previousNode.next = insertNode;
      this.length++;
      return insertNode;
    }

    return null;
  }

  delete(index: number): ListNode<T> | null | undefined {
    if (!this.head || index < 0 || index > this.length) return null;

    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const previousNode = this.get(index - 1);
    const removedNode = previousNode;

    if (previousNode) {
      previousNode.next = previousNode.next?.next;
      this.length--;
      return removedNode;
    }
    return null;
  }

  reverse() {
    if (!this.head || !this.tail) return null;

    let previousNode: ListNode<T> | null = null;
    let currentNode = this.head;

    while (currentNode) {
      const bufferNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = bufferNode as ListNode<T>;
    }

    this.tail = this.head;
    this.head = previousNode;

    return this;
  }
}
