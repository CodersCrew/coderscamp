import {initWriteTestModule} from "@/shared/test-utils";
import {EmailSendingWriteModule} from "@/write/email-sender/email-sending.write-module";

export async function emailSendingTestModule() {
  return initWriteTestModule({
    modules: [EmailSendingWriteModule]
  })
}
