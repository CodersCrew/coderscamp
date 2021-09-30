export enum NotificationTokenErrorMessages {
  EXPIRED = 'NotificationToken expired',
  DISPOSED = 'NotificationToken disposed',
  TIMEOUT = 'NotificationToken timeout',
}

export class NotificationToken {
  private promise: Promise<void>;

  private resolve: () => void;

  private reject: (e: Error) => void;

  private expiredInternal = false;

  get expired() {
    return this.expiredInternal;
  }

  constructor() {
    this.expiredInternal = true;
    this.reset();
  }

  notify(): void {
    if (this.expired) {
      throw new Error(NotificationTokenErrorMessages.EXPIRED);
    }

    this.resolve();
    this.expiredInternal = true;
  }

  dispose(): void {
    if (this.expired) {
      return;
    }

    this.reject(new Error(NotificationTokenErrorMessages.DISPOSED));
    this.expiredInternal = true;
  }

  reset(): void {
    this.dispose();
    this.expiredInternal = false;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.promise.catch(() => {});
  }

  wait(timeout?: number): Promise<void> {
    if (this.expired) {
      return Promise.reject(Error(NotificationTokenErrorMessages.EXPIRED));
    }

    if (!timeout) {
      return this.promise;
    }

    let next: ((e: unknown) => void) | undefined;
    const promise = new Promise<void>((resolve, reject) => {
      const id = setTimeout(() => {
        reject(new Error(NotificationTokenErrorMessages.TIMEOUT));
      }, timeout);

      next = () => {
        resolve();
        clearTimeout(id);
      };
    });

    this.promise.then(next, next);

    return promise;
  }
}
