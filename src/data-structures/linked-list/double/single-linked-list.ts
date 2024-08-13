class ListNode<T> {
  value: T;
  next: ListNode<T> | null | undefined;
  previous: ListNode<T> | null | undefined;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export default class DoubleLinkList<T> {
  head: ListNode<T> | null | undefined;
  tail: ListNode<T> | null | undefined;
  length: number;

  constructor(initialValue?: T | null) {
    if (initialValue) {
      const newNode = new ListNode(initialValue);
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
    } else {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  }

  #isListEmpty(): boolean {
    return this.length === 0;
  }

  #hasOneNode(): boolean {
    return this.head === this.tail;
  }

  #isValidIndex(index: number) {
    const middle = Math.floor(this.length / 2);
    return {
      valid: index > 0 && index <= this.length,
      isHead: index === 0,
      isTail: index === this.length,
      iteratesFromHead: index < middle ? true : false,
    };
  }

  push(value: T): ListNode<T> {
    const newNode = new ListNode(value);
    if (this.#isListEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  pop(): ListNode<T> | null {
    if (this.#isListEmpty()) return null;

    const poppedNode = this.tail!;
    if (this.#hasOneNode()) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.previous;
      this.tail!.next = null;
    }

    this.length--;
    return poppedNode;
  }

  shift(): ListNode<T> | null {
    if (this.#isListEmpty()) return null;

    const shiftedNode = this.head!;
    if (this.#hasOneNode()) {
      this.head = null;
      this.tail = null;
    } else {
      this.head!.next!.previous = null;
      this.head = this.head!.next;
    }
    this.length--;
    return shiftedNode;
  }

  unshift(value: T): ListNode<T> {
    const newNode = new ListNode(value);
    if (this.#isListEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head!.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return newNode;
  }

  get(index: number): ListNode<T> | null {
    const { valid, iteratesFromHead } = this.#isValidIndex(index);

    if (this.#isListEmpty() || !valid) return null;

    let currentIndex: number = iteratesFromHead ? 0 : this.length - 1;
    let currentNode: ListNode<T> = iteratesFromHead ? this.head! : this.tail!;
    const loopListNodesDirection: boolean = iteratesFromHead
      ? currentIndex <= index
      : currentIndex >= index;

    while (loopListNodesDirection) {
      currentNode = currentNode[iteratesFromHead ? "next" : "previous"]!;
      iteratesFromHead ? currentIndex++ : currentIndex--;
    }

    return currentNode;
  }
}
