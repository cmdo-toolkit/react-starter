export class Response {
  constructor(public readonly valid: boolean = true, public readonly message?: string) {}

  public static valid() {
    return new Response(true);
  }

  public static invalid(message: string) {
    return new Response(false, message);
  }
}
