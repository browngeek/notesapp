import {
  Amplify,
  AmplifyError,
  AmplifyErrorCode,
  AmplifyUrl,
  AmplifyUrlSearchParams,
  Category,
  ConsoleLogger,
  EMPTY_HASH,
  StorageAction,
  composeServiceApi,
  composeTransferHandler,
  defaultStorage,
  extendedEncodeURIComponent,
  getAmplifyUserAgent,
  getDnsSuffix,
  getHashedPayload,
  getRetryDecider,
  jitteredBackoff,
  parseMetadata,
  presignUrl,
  retryMiddlewareFactory,
  signingMiddlewareFactory,
  userAgentMiddlewareFactory,
  withMemoization
} from "./chunk-DSIIKXPB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// browser-external:fast-xml-parser
var require_fast_xml_parser = __commonJS({
  "browser-external:fast-xml-parser"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "fast-xml-parser" has been externalized for browser compatibility. Cannot access "fast-xml-parser.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:buffer
var require_buffer = __commonJS({
  "browser-external:buffer"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/@aws-amplify/storage/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js
var fromUtf8 = (input) => new TextEncoder().encode(input);

// node_modules/@aws-amplify/storage/node_modules/@smithy/md5-js/dist-es/constants.js
var BLOCK_SIZE = 64;
var DIGEST_LENGTH = 16;
var INIT = [1732584193, 4023233417, 2562383102, 271733878];

// node_modules/@aws-amplify/storage/node_modules/@smithy/md5-js/dist-es/index.js
var Md5 = class {
  constructor() {
    this.reset();
  }
  update(sourceData) {
    if (isEmptyData(sourceData)) {
      return;
    } else if (this.finished) {
      throw new Error("Attempted to update an already finished hash.");
    }
    const data = convertToBuffer(sourceData);
    let position = 0;
    let { byteLength: byteLength2 } = data;
    this.bytesHashed += byteLength2;
    while (byteLength2 > 0) {
      this.buffer.setUint8(this.bufferLength++, data[position++]);
      byteLength2--;
      if (this.bufferLength === BLOCK_SIZE) {
        this.hashBuffer();
        this.bufferLength = 0;
      }
    }
  }
  async digest() {
    if (!this.finished) {
      const { buffer, bufferLength: undecoratedLength, bytesHashed } = this;
      const bitsHashed = bytesHashed * 8;
      buffer.setUint8(this.bufferLength++, 128);
      if (undecoratedLength % BLOCK_SIZE >= BLOCK_SIZE - 8) {
        for (let i = this.bufferLength; i < BLOCK_SIZE; i++) {
          buffer.setUint8(i, 0);
        }
        this.hashBuffer();
        this.bufferLength = 0;
      }
      for (let i = this.bufferLength; i < BLOCK_SIZE - 8; i++) {
        buffer.setUint8(i, 0);
      }
      buffer.setUint32(BLOCK_SIZE - 8, bitsHashed >>> 0, true);
      buffer.setUint32(BLOCK_SIZE - 4, Math.floor(bitsHashed / 4294967296), true);
      this.hashBuffer();
      this.finished = true;
    }
    const out = new DataView(new ArrayBuffer(DIGEST_LENGTH));
    for (let i = 0; i < 4; i++) {
      out.setUint32(i * 4, this.state[i], true);
    }
    return new Uint8Array(out.buffer, out.byteOffset, out.byteLength);
  }
  hashBuffer() {
    const { buffer, state } = this;
    let a = state[0], b = state[1], c = state[2], d = state[3];
    a = ff(a, b, c, d, buffer.getUint32(0, true), 7, 3614090360);
    d = ff(d, a, b, c, buffer.getUint32(4, true), 12, 3905402710);
    c = ff(c, d, a, b, buffer.getUint32(8, true), 17, 606105819);
    b = ff(b, c, d, a, buffer.getUint32(12, true), 22, 3250441966);
    a = ff(a, b, c, d, buffer.getUint32(16, true), 7, 4118548399);
    d = ff(d, a, b, c, buffer.getUint32(20, true), 12, 1200080426);
    c = ff(c, d, a, b, buffer.getUint32(24, true), 17, 2821735955);
    b = ff(b, c, d, a, buffer.getUint32(28, true), 22, 4249261313);
    a = ff(a, b, c, d, buffer.getUint32(32, true), 7, 1770035416);
    d = ff(d, a, b, c, buffer.getUint32(36, true), 12, 2336552879);
    c = ff(c, d, a, b, buffer.getUint32(40, true), 17, 4294925233);
    b = ff(b, c, d, a, buffer.getUint32(44, true), 22, 2304563134);
    a = ff(a, b, c, d, buffer.getUint32(48, true), 7, 1804603682);
    d = ff(d, a, b, c, buffer.getUint32(52, true), 12, 4254626195);
    c = ff(c, d, a, b, buffer.getUint32(56, true), 17, 2792965006);
    b = ff(b, c, d, a, buffer.getUint32(60, true), 22, 1236535329);
    a = gg(a, b, c, d, buffer.getUint32(4, true), 5, 4129170786);
    d = gg(d, a, b, c, buffer.getUint32(24, true), 9, 3225465664);
    c = gg(c, d, a, b, buffer.getUint32(44, true), 14, 643717713);
    b = gg(b, c, d, a, buffer.getUint32(0, true), 20, 3921069994);
    a = gg(a, b, c, d, buffer.getUint32(20, true), 5, 3593408605);
    d = gg(d, a, b, c, buffer.getUint32(40, true), 9, 38016083);
    c = gg(c, d, a, b, buffer.getUint32(60, true), 14, 3634488961);
    b = gg(b, c, d, a, buffer.getUint32(16, true), 20, 3889429448);
    a = gg(a, b, c, d, buffer.getUint32(36, true), 5, 568446438);
    d = gg(d, a, b, c, buffer.getUint32(56, true), 9, 3275163606);
    c = gg(c, d, a, b, buffer.getUint32(12, true), 14, 4107603335);
    b = gg(b, c, d, a, buffer.getUint32(32, true), 20, 1163531501);
    a = gg(a, b, c, d, buffer.getUint32(52, true), 5, 2850285829);
    d = gg(d, a, b, c, buffer.getUint32(8, true), 9, 4243563512);
    c = gg(c, d, a, b, buffer.getUint32(28, true), 14, 1735328473);
    b = gg(b, c, d, a, buffer.getUint32(48, true), 20, 2368359562);
    a = hh(a, b, c, d, buffer.getUint32(20, true), 4, 4294588738);
    d = hh(d, a, b, c, buffer.getUint32(32, true), 11, 2272392833);
    c = hh(c, d, a, b, buffer.getUint32(44, true), 16, 1839030562);
    b = hh(b, c, d, a, buffer.getUint32(56, true), 23, 4259657740);
    a = hh(a, b, c, d, buffer.getUint32(4, true), 4, 2763975236);
    d = hh(d, a, b, c, buffer.getUint32(16, true), 11, 1272893353);
    c = hh(c, d, a, b, buffer.getUint32(28, true), 16, 4139469664);
    b = hh(b, c, d, a, buffer.getUint32(40, true), 23, 3200236656);
    a = hh(a, b, c, d, buffer.getUint32(52, true), 4, 681279174);
    d = hh(d, a, b, c, buffer.getUint32(0, true), 11, 3936430074);
    c = hh(c, d, a, b, buffer.getUint32(12, true), 16, 3572445317);
    b = hh(b, c, d, a, buffer.getUint32(24, true), 23, 76029189);
    a = hh(a, b, c, d, buffer.getUint32(36, true), 4, 3654602809);
    d = hh(d, a, b, c, buffer.getUint32(48, true), 11, 3873151461);
    c = hh(c, d, a, b, buffer.getUint32(60, true), 16, 530742520);
    b = hh(b, c, d, a, buffer.getUint32(8, true), 23, 3299628645);
    a = ii(a, b, c, d, buffer.getUint32(0, true), 6, 4096336452);
    d = ii(d, a, b, c, buffer.getUint32(28, true), 10, 1126891415);
    c = ii(c, d, a, b, buffer.getUint32(56, true), 15, 2878612391);
    b = ii(b, c, d, a, buffer.getUint32(20, true), 21, 4237533241);
    a = ii(a, b, c, d, buffer.getUint32(48, true), 6, 1700485571);
    d = ii(d, a, b, c, buffer.getUint32(12, true), 10, 2399980690);
    c = ii(c, d, a, b, buffer.getUint32(40, true), 15, 4293915773);
    b = ii(b, c, d, a, buffer.getUint32(4, true), 21, 2240044497);
    a = ii(a, b, c, d, buffer.getUint32(32, true), 6, 1873313359);
    d = ii(d, a, b, c, buffer.getUint32(60, true), 10, 4264355552);
    c = ii(c, d, a, b, buffer.getUint32(24, true), 15, 2734768916);
    b = ii(b, c, d, a, buffer.getUint32(52, true), 21, 1309151649);
    a = ii(a, b, c, d, buffer.getUint32(16, true), 6, 4149444226);
    d = ii(d, a, b, c, buffer.getUint32(44, true), 10, 3174756917);
    c = ii(c, d, a, b, buffer.getUint32(8, true), 15, 718787259);
    b = ii(b, c, d, a, buffer.getUint32(36, true), 21, 3951481745);
    state[0] = a + state[0] & 4294967295;
    state[1] = b + state[1] & 4294967295;
    state[2] = c + state[2] & 4294967295;
    state[3] = d + state[3] & 4294967295;
  }
  reset() {
    this.state = Uint32Array.from(INIT);
    this.buffer = new DataView(new ArrayBuffer(BLOCK_SIZE));
    this.bufferLength = 0;
    this.bytesHashed = 0;
    this.finished = false;
  }
};
function cmn(q, a, b, x, s, t) {
  a = (a + q & 4294967295) + (x + t & 4294967295) & 4294967295;
  return (a << s | a >>> 32 - s) + b & 4294967295;
}
function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}
function isEmptyData(data) {
  if (typeof data === "string") {
    return data.length === 0;
  }
  return data.byteLength === 0;
}
function convertToBuffer(data) {
  if (typeof data === "string") {
    return fromUtf8(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data);
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/runtime/constants.mjs
var NETWORK_ERROR_MESSAGE = "Network Error";
var NETWORK_ERROR_CODE = "ERR_NETWORK";
var ABORT_ERROR_MESSAGE = "Request aborted";
var ABORT_ERROR_CODE = "ERR_ABORTED";
var CANCELED_ERROR_MESSAGE = "canceled";
var CANCELED_ERROR_CODE = "ERR_CANCELED";
var CONTENT_SHA256_HEADER = "x-amz-content-sha256";

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/runtime/contentSha256middleware.mjs
var contentSha256MiddlewareFactory = () => (next) => async function contentSha256Middleware(request) {
  if (request.headers[CONTENT_SHA256_HEADER]) {
    return next(request);
  } else {
    const hash = await getHashedPayload(request.body);
    request.headers[CONTENT_SHA256_HEADER] = hash;
    return next(request);
  }
};

// node_modules/@aws-amplify/storage/dist/esm/errors/StorageError.mjs
var StorageError = class _StorageError extends AmplifyError {
  constructor(params) {
    super(params);
    this.constructor = _StorageError;
    Object.setPrototypeOf(this, _StorageError.prototype);
  }
};

// node_modules/@aws-amplify/storage/dist/esm/errors/CanceledError.mjs
var CanceledError = class _CanceledError extends StorageError {
  constructor(params = {}) {
    super({
      name: "CanceledError",
      message: "Upload is canceled by user",
      ...params
    });
    this.constructor = _CanceledError;
    Object.setPrototypeOf(this, _CanceledError.prototype);
  }
};
var isCancelError = (error) => !!error && error instanceof CanceledError;

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/runtime/xhrTransferHandler.mjs
var logger = new ConsoleLogger("xhr-http-handler");
var xhrTransferHandler = (request, options) => {
  const { url, method, headers, body } = request;
  const { onDownloadProgress, onUploadProgress, responseType, abortSignal } = options;
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method.toUpperCase(), url.toString());
    Object.entries(headers).filter(([header]) => !FORBIDDEN_HEADERS.includes(header)).forEach(([header, value]) => {
      xhr.setRequestHeader(header, value);
    });
    xhr.responseType = responseType;
    if (onDownloadProgress) {
      xhr.addEventListener("progress", (event) => {
        onDownloadProgress(convertToTransferProgressEvent(event));
        logger.debug(event);
      });
    }
    if (onUploadProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        onUploadProgress(convertToTransferProgressEvent(event));
        logger.debug(event);
      });
    }
    xhr.addEventListener("error", () => {
      const networkError = new StorageError({
        message: NETWORK_ERROR_MESSAGE,
        name: NETWORK_ERROR_CODE
      });
      logger.error(NETWORK_ERROR_MESSAGE);
      reject(networkError);
      xhr = null;
    });
    xhr.addEventListener("abort", () => {
      if (!xhr || (abortSignal == null ? void 0 : abortSignal.aborted))
        return;
      const error = buildHandlerError(ABORT_ERROR_MESSAGE, ABORT_ERROR_CODE);
      logger.error(ABORT_ERROR_MESSAGE);
      reject(error);
      xhr = null;
    });
    xhr.addEventListener("readystatechange", () => {
      if (!xhr || xhr.readyState !== xhr.DONE) {
        return;
      }
      const onloadend = () => {
        if (!xhr)
          return;
        const responseHeaders = convertResponseHeaders(xhr.getAllResponseHeaders());
        const { responseType: loadEndResponseType } = xhr;
        const responseBlob = xhr.response;
        const responseText = loadEndResponseType === "text" ? xhr.responseText : "";
        const bodyMixIn = {
          blob: () => Promise.resolve(responseBlob),
          text: withMemoization(() => loadEndResponseType === "blob" ? readBlobAsText(responseBlob) : Promise.resolve(responseText)),
          json: () => Promise.reject(
            // S3 does not support JSON response. So fail-fast here with nicer error message.
            new Error("Parsing response to JSON is not implemented. Please use response.text() instead.")
          )
        };
        const response = {
          statusCode: xhr.status,
          headers: responseHeaders,
          // The xhr.responseType is only set to 'blob' for streaming binary S3 object data. The streaming data is
          // exposed via public interface of Storage.get(). So we need to return the response as a Blob object for
          // backward compatibility. In other cases, the response payload is only used internally, we return it is
          // {@link ResponseBodyMixin}
          body: xhr.responseType === "blob" ? Object.assign(responseBlob, bodyMixIn) : bodyMixIn
        };
        resolve(response);
        xhr = null;
      };
      setTimeout(onloadend);
    });
    if (abortSignal) {
      const onCanceled = () => {
        if (!xhr) {
          return;
        }
        const canceledError = new CanceledError({
          name: CANCELED_ERROR_CODE,
          message: CANCELED_ERROR_MESSAGE
        });
        reject(canceledError);
        xhr.abort();
        xhr = null;
      };
      abortSignal.aborted ? onCanceled() : abortSignal.addEventListener("abort", onCanceled);
    }
    if (typeof ReadableStream === "function" && body instanceof ReadableStream) {
      throw new Error("ReadableStream request payload is not supported.");
    }
    xhr.send(body ?? null);
  });
};
var convertToTransferProgressEvent = (event) => ({
  transferredBytes: event.loaded,
  totalBytes: event.lengthComputable ? event.total : void 0
});
var buildHandlerError = (message, name) => {
  const error = new Error(message);
  error.name = name;
  return error;
};
var convertResponseHeaders = (xhrHeaders) => {
  if (!xhrHeaders) {
    return {};
  }
  return xhrHeaders.split("\r\n").reduce((headerMap, line) => {
    const parts = line.split(": ");
    const header = parts.shift();
    const value = parts.join(": ");
    headerMap[header.toLowerCase()] = value;
    return headerMap;
  }, {});
};
var readBlobAsText = (blob) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (reader.readyState !== FileReader.DONE) {
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsText(blob);
  });
};
var FORBIDDEN_HEADERS = ["host"];

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs
var s3TransferHandler = composeTransferHandler(xhrTransferHandler, [
  contentSha256MiddlewareFactory,
  userAgentMiddlewareFactory,
  retryMiddlewareFactory,
  signingMiddlewareFactory
]);

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/index.mjs
var import_fast_xml_parser15 = __toESM(require_fast_xml_parser(), 1);
var import_buffer15 = __toESM(require_buffer(), 1);

// node_modules/@aws-amplify/storage/dist/esm/errors/types/validation.mjs
var StorageValidationErrorCode;
(function(StorageValidationErrorCode2) {
  StorageValidationErrorCode2["NoCredentials"] = "NoCredentials";
  StorageValidationErrorCode2["NoIdentityId"] = "NoIdentityId";
  StorageValidationErrorCode2["NoKey"] = "NoKey";
  StorageValidationErrorCode2["NoSourceKey"] = "NoSourceKey";
  StorageValidationErrorCode2["NoDestinationKey"] = "NoDestinationKey";
  StorageValidationErrorCode2["NoSourcePath"] = "NoSourcePath";
  StorageValidationErrorCode2["NoDestinationPath"] = "NoDestinationPath";
  StorageValidationErrorCode2["NoBucket"] = "NoBucket";
  StorageValidationErrorCode2["NoRegion"] = "NoRegion";
  StorageValidationErrorCode2["InvalidStorageBucket"] = "InvalidStorageBucket";
  StorageValidationErrorCode2["InvalidCopyOperationStorageBucket"] = "InvalidCopyOperationStorageBucket";
  StorageValidationErrorCode2["InvalidStorageOperationPrefixInput"] = "InvalidStorageOperationPrefixInput";
  StorageValidationErrorCode2["InvalidStorageOperationInput"] = "InvalidStorageOperationInput";
  StorageValidationErrorCode2["InvalidStoragePathInput"] = "InvalidStoragePathInput";
  StorageValidationErrorCode2["InvalidUploadSource"] = "InvalidUploadSource";
  StorageValidationErrorCode2["ObjectIsTooLarge"] = "ObjectIsTooLarge";
  StorageValidationErrorCode2["UrlExpirationMaxLimitExceed"] = "UrlExpirationMaxLimitExceed";
})(StorageValidationErrorCode || (StorageValidationErrorCode = {}));
var validationErrorMap = {
  [StorageValidationErrorCode.NoCredentials]: {
    message: "Credentials should not be empty."
  },
  [StorageValidationErrorCode.NoIdentityId]: {
    message: "Missing identity ID when accessing objects in protected or private access level."
  },
  [StorageValidationErrorCode.NoKey]: {
    message: "Missing key in api call."
  },
  [StorageValidationErrorCode.NoSourceKey]: {
    message: "Missing source key in copy api call."
  },
  [StorageValidationErrorCode.NoDestinationKey]: {
    message: "Missing destination key in copy api call."
  },
  [StorageValidationErrorCode.NoSourcePath]: {
    message: "Missing source path in copy api call."
  },
  [StorageValidationErrorCode.NoDestinationPath]: {
    message: "Missing destination path in copy api call."
  },
  [StorageValidationErrorCode.NoBucket]: {
    message: "Missing bucket name while accessing object."
  },
  [StorageValidationErrorCode.NoRegion]: {
    message: "Missing region while accessing object."
  },
  [StorageValidationErrorCode.UrlExpirationMaxLimitExceed]: {
    message: "Url Expiration can not be greater than 7 Days."
  },
  [StorageValidationErrorCode.ObjectIsTooLarge]: {
    message: "Object size cannot not be greater than 5TB."
  },
  [StorageValidationErrorCode.InvalidUploadSource]: {
    message: "Upload source type can only be a `Blob`, `File`, `ArrayBuffer`, or `string`."
  },
  [StorageValidationErrorCode.InvalidStorageOperationInput]: {
    message: "Path or key parameter must be specified in the input. Both can not be specified at the same time."
  },
  [StorageValidationErrorCode.InvalidStorageOperationPrefixInput]: {
    message: "Both path and prefix can not be specified at the same time."
  },
  [StorageValidationErrorCode.InvalidStoragePathInput]: {
    message: "Input `path` does not allow a leading slash (/)."
  },
  [StorageValidationErrorCode.InvalidStorageBucket]: {
    message: "Unable to lookup bucket from provided name in Amplify configuration."
  },
  [StorageValidationErrorCode.InvalidCopyOperationStorageBucket]: {
    message: "Missing bucket option in either source or destination."
  }
};

// node_modules/@aws-amplify/storage/dist/esm/errors/utils/assertValidationError.mjs
function assertValidationError(assertion, name) {
  const { message, recoverySuggestion } = validationErrorMap[name];
  if (!assertion) {
    throw new StorageError({ name, message, recoverySuggestion });
  }
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/constants.mjs
var LOCAL_TESTING_S3_ENDPOINT = "http://localhost:20005";
var DEFAULT_ACCESS_LEVEL = "guest";
var DEFAULT_PRESIGN_EXPIRATION = 900;
var MAX_URL_EXPIRATION = 7 * 24 * 60 * 60 * 1e3;
var MiB = 1024 * 1024;
var GiB = 1024 * MiB;
var TiB = 1024 * GiB;
var DEFAULT_PART_SIZE = 5 * MiB;
var MAX_OBJECT_SIZE = 5 * TiB;
var MAX_PARTS_COUNT = 1e4;
var DEFAULT_QUEUE_SIZE = 4;
var UPLOADS_STORAGE_KEY = "__uploadInProgress";
var STORAGE_INPUT_PREFIX = "prefix";
var STORAGE_INPUT_KEY = "key";
var STORAGE_INPUT_PATH = "path";
var DEFAULT_DELIMITER = "/";

// node_modules/@aws-amplify/storage/dist/esm/utils/logger.mjs
var logger2 = new ConsoleLogger("Storage");

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/transferTask.mjs
var createCancellableTask = ({ job, onCancel }) => {
  const state = "IN_PROGRESS";
  let canceledErrorMessage;
  const cancelableTask = {
    cancel: (message) => {
      const { state: taskState } = cancelableTask;
      if (taskState === "CANCELED" || taskState === "ERROR" || taskState === "SUCCESS") {
        logger2.debug(`This task cannot be canceled. State: ${taskState}`);
        return;
      }
      cancelableTask.state = "CANCELED";
      canceledErrorMessage = message;
      onCancel(canceledErrorMessage);
    },
    state
  };
  const wrappedJobPromise = (async () => {
    try {
      const result = await job();
      cancelableTask.state = "SUCCESS";
      return result;
    } catch (e) {
      if (isCancelError(e)) {
        cancelableTask.state = "CANCELED";
        e.message = canceledErrorMessage ?? e.message;
      }
      cancelableTask.state = "ERROR";
      throw e;
    }
  })();
  return Object.assign(cancelableTask, {
    result: wrappedJobPromise
  });
};
var createDownloadTask = createCancellableTask;
var createUploadTask = ({ job, onCancel, onResume, onPause, isMultipartUpload }) => {
  const cancellableTask = createCancellableTask({
    job,
    onCancel
  });
  const uploadTask = Object.assign(cancellableTask, {
    pause: () => {
      const { state } = uploadTask;
      if (!isMultipartUpload || state !== "IN_PROGRESS") {
        logger2.debug(`This task cannot be paused. State: ${state}`);
        return;
      }
      uploadTask.state = "PAUSED";
      onPause == null ? void 0 : onPause();
    },
    resume: () => {
      const { state } = uploadTask;
      if (!isMultipartUpload || state !== "PAUSED") {
        logger2.debug(`This task cannot be resumed. State: ${state}`);
        return;
      }
      uploadTask.state = "IN_PROGRESS";
      onResume == null ? void 0 : onResume();
    }
  });
  return uploadTask;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/byteLength.mjs
var byteLength = (input) => {
  if (input === null || input === void 0)
    return 0;
  if (typeof input === "string") {
    let len = input.length;
    for (let i = len - 1; i >= 0; i--) {
      const code = input.charCodeAt(i);
      if (code > 127 && code <= 2047)
        len++;
      else if (code > 2047 && code <= 65535)
        len += 2;
      if (code >= 56320 && code <= 57343)
        i--;
    }
    return len;
  } else if (typeof input.byteLength === "number") {
    return input.byteLength;
  } else if (typeof input.size === "number") {
    return input.size;
  }
  return void 0;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/md5.mjs
var import_fast_xml_parser = __toESM(require_fast_xml_parser(), 1);

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/runtime/base64/index.browser.mjs
function bytesToBase64(bytes) {
  const base64Str = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
  return btoa(base64Str);
}
function toBase64(input) {
  if (typeof input === "string") {
    return bytesToBase64(new TextEncoder().encode(input));
  }
  return bytesToBase64(new Uint8Array(input.buffer, input.byteOffset, input.byteLength));
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/md5.mjs
var calculateContentMd5 = async (content) => {
  const hasher = new Md5();
  const buffer = content instanceof Blob ? await readFile(content) : content;
  hasher.update(buffer);
  const digest = await hasher.digest();
  return toBase64(digest);
};
var readFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.onabort = () => {
    reject(new Error("Read aborted"));
  };
  reader.onerror = () => {
    reject(reader.error);
  };
  reader.readAsArrayBuffer(file);
});

// node_modules/@aws-amplify/storage/dist/esm/utils/resolvePrefix.mjs
var resolvePrefix = ({ accessLevel, targetIdentityId }) => {
  if (accessLevel === "private") {
    assertValidationError(!!targetIdentityId, StorageValidationErrorCode.NoIdentityId);
    return `private/${targetIdentityId}/`;
  } else if (accessLevel === "protected") {
    assertValidationError(!!targetIdentityId, StorageValidationErrorCode.NoIdentityId);
    return `protected/${targetIdentityId}/`;
  } else {
    return "public/";
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs
var resolveS3ConfigAndInput = async (amplify, apiOptions) => {
  var _a, _b, _c, _d;
  const { identityId } = await amplify.Auth.fetchAuthSession();
  assertValidationError(!!identityId, StorageValidationErrorCode.NoIdentityId);
  const credentialsProvider = async () => {
    const { credentials } = await amplify.Auth.fetchAuthSession();
    assertValidationError(!!credentials, StorageValidationErrorCode.NoCredentials);
    return credentials;
  };
  const { bucket: defaultBucket, region: defaultRegion, dangerouslyConnectToHttpEndpointForTesting, buckets } = ((_b = (_a = amplify.getConfig()) == null ? void 0 : _a.Storage) == null ? void 0 : _b.S3) ?? {};
  const { bucket = defaultBucket, region = defaultRegion } = (apiOptions == null ? void 0 : apiOptions.bucket) && resolveBucketConfig(apiOptions, buckets) || {};
  assertValidationError(!!bucket, StorageValidationErrorCode.NoBucket);
  assertValidationError(!!region, StorageValidationErrorCode.NoRegion);
  const { defaultAccessLevel, prefixResolver = resolvePrefix, isObjectLockEnabled } = ((_d = (_c = amplify.libraryOptions) == null ? void 0 : _c.Storage) == null ? void 0 : _d.S3) ?? {};
  const keyPrefix = await prefixResolver({
    accessLevel: (apiOptions == null ? void 0 : apiOptions.accessLevel) ?? defaultAccessLevel ?? DEFAULT_ACCESS_LEVEL,
    // use conditional assign to make tsc happy because StorageOptions is a union type that may not have targetIdentityId
    targetIdentityId: (apiOptions == null ? void 0 : apiOptions.accessLevel) === "protected" ? (apiOptions == null ? void 0 : apiOptions.targetIdentityId) ?? identityId : identityId
  });
  return {
    s3Config: {
      credentials: credentialsProvider,
      region,
      useAccelerateEndpoint: apiOptions == null ? void 0 : apiOptions.useAccelerateEndpoint,
      ...dangerouslyConnectToHttpEndpointForTesting ? {
        customEndpoint: LOCAL_TESTING_S3_ENDPOINT,
        forcePathStyle: true
      } : {}
    },
    bucket,
    keyPrefix,
    identityId,
    isObjectLockEnabled
  };
};
var resolveBucketConfig = (apiOptions, buckets) => {
  if (typeof apiOptions.bucket === "string") {
    const bucketConfig = buckets == null ? void 0 : buckets[apiOptions.bucket];
    assertValidationError(!!bucketConfig, StorageValidationErrorCode.InvalidStorageBucket);
    return { bucket: bucketConfig.bucketName, region: bucketConfig.region };
  }
  if (typeof apiOptions.bucket === "object") {
    return {
      bucket: apiOptions.bucket.bucketName,
      region: apiOptions.bucket.region
    };
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/isInputWithPath.mjs
var isInputWithPath = (input) => {
  return input.path !== void 0;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/validateStorageOperationInput.mjs
var validateStorageOperationInput = (input, identityId) => {
  assertValidationError(
    // Key present without a path
    !!input.key && !input.path || // Path present without a key
    !input.key && !!input.path,
    StorageValidationErrorCode.InvalidStorageOperationInput
  );
  if (isInputWithPath(input)) {
    const { path } = input;
    const objectKey = typeof path === "string" ? path : path({ identityId });
    assertValidationError(!objectKey.startsWith("/"), StorageValidationErrorCode.InvalidStoragePathInput);
    return {
      inputType: STORAGE_INPUT_PATH,
      objectKey
    };
  } else {
    return { inputType: STORAGE_INPUT_KEY, objectKey: input.key };
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/runtime/xmlParser/dom.mjs
var parser = {
  parse: (xmlStr) => {
    const domParser = new DOMParser();
    const xml = domParser.parseFromString(xmlStr, "text/xml");
    const parsedObj = parseXmlNode(xml);
    const rootKey = Object.keys(parsedObj)[0];
    return parsedObj[rootKey];
  }
};
var parseXmlNode = (node) => {
  var _a;
  if (isDocumentNode(node)) {
    return {
      [node.documentElement.nodeName]: parseXmlNode(node.documentElement)
    };
  }
  if (node.nodeType === Node.TEXT_NODE) {
    return (_a = node.nodeValue) == null ? void 0 : _a.trim();
  }
  if (isElementNode(node)) {
    if (isTextOnlyElementNode(node)) {
      return node.childNodes[0].nodeValue;
    }
    const nodeValue = {};
    for (const attr of node.attributes) {
      if (!isNamespaceAttributeName(attr.nodeName)) {
        nodeValue[attr.nodeName] = attr.nodeValue;
      }
    }
    if (node.children.length > 0) {
      for (const child of node.children) {
        const childValue = parseXmlNode(child);
        if (childValue === void 0) {
          continue;
        }
        const childName = child.nodeName;
        if (nodeValue[childName] === void 0) {
          nodeValue[childName] = childValue;
        } else if (Array.isArray(nodeValue[childName])) {
          nodeValue[childName].push(childValue);
        } else {
          nodeValue[childName] = [nodeValue[childName], childValue];
        }
      }
    }
    return Object.keys(nodeValue).length === 0 ? "" : nodeValue;
  }
};
var isElementNode = (node) => node.nodeType === Node.ELEMENT_NODE;
var isDocumentNode = (node) => node.nodeType === Node.DOCUMENT_NODE;
var isTextOnlyElementNode = (node) => {
  var _a;
  return hasOnlyNamespaceAttributes(node) && node.children.length === 0 && ((_a = node.firstChild) == null ? void 0 : _a.nodeType) === Node.TEXT_NODE;
};
var hasOnlyNamespaceAttributes = (node) => {
  for (const attr of node.attributes) {
    if (!isNamespaceAttributeName(attr.nodeName)) {
      return false;
    }
  }
  return true;
};
var isNamespaceAttributeName = (name) => name === "xmlns" || name.startsWith("xmlns:");

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/utils/parsePayload.mjs
var import_buffer = __toESM(require_buffer(), 1);
var parseXmlError = async (response) => {
  if (!response || response.statusCode < 300) {
    return;
  }
  const { statusCode } = response;
  const body = await parseXmlBody(response);
  const code = (body == null ? void 0 : body.Code) ? body.Code : statusCode === 404 ? "NotFound" : statusCode.toString();
  const message = (body == null ? void 0 : body.message) ?? (body == null ? void 0 : body.Message) ?? code;
  const error = new Error(message);
  return Object.assign(error, {
    name: code,
    $metadata: parseMetadata(response)
  });
};
var parseXmlBody = async (response) => {
  if (!response.body) {
    throw new Error("S3 aborted request.");
  }
  const data = await response.body.text();
  if ((data == null ? void 0 : data.length) > 0) {
    try {
      return parser.parse(data);
    } catch (error) {
      throw new Error(`Failed to parse XML response: ${error}`);
    }
  }
  return {};
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/base.mjs
var import_fast_xml_parser2 = __toESM(require_fast_xml_parser(), 1);
var import_buffer2 = __toESM(require_buffer(), 1);
var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
var DOTS_PATTERN = /\.\./;
var SERVICE_NAME = "s3";
var endpointResolver = (options, apiInput) => {
  const { region, useAccelerateEndpoint, customEndpoint, forcePathStyle } = options;
  let endpoint;
  if (customEndpoint) {
    endpoint = new AmplifyUrl(customEndpoint);
  } else if (useAccelerateEndpoint) {
    if (forcePathStyle) {
      throw new Error("Path style URLs are not supported with S3 Transfer Acceleration.");
    }
    endpoint = new AmplifyUrl(`https://s3-accelerate.${getDnsSuffix(region)}`);
  } else {
    endpoint = new AmplifyUrl(`https://s3.${region}.${getDnsSuffix(region)}`);
  }
  if (apiInput == null ? void 0 : apiInput.Bucket) {
    if (!isDnsCompatibleBucketName(apiInput.Bucket)) {
      throw new Error(`Invalid bucket name: "${apiInput.Bucket}".`);
    }
    if (forcePathStyle || apiInput.Bucket.includes(".")) {
      endpoint.pathname = `/${apiInput.Bucket}`;
    } else {
      endpoint.host = `${apiInput.Bucket}.${endpoint.host}`;
    }
  }
  return { url: endpoint };
};
var isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
var defaultConfig = {
  service: SERVICE_NAME,
  endpointResolver,
  retryDecider: getRetryDecider(parseXmlError),
  computeDelay: jitteredBackoff,
  userAgentValue: getAmplifyUserAgent(),
  useAccelerateEndpoint: false,
  uriEscapePath: false
  // Required by S3. See https://github.com/aws/aws-sdk-js-v3/blob/9ba012dfa3a3429aa2db0f90b3b0b3a7a31f9bc3/packages/signature-v4/src/SignatureV4.ts#L76-L83
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/getObject.mjs
var import_fast_xml_parser3 = __toESM(require_fast_xml_parser(), 1);
var import_buffer3 = __toESM(require_buffer(), 1);

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs
var map = (obj, instructions) => {
  const result = {};
  for (const [key, instruction] of Object.entries(instructions)) {
    const [accessor, deserializer] = Array.isArray(instruction) ? instruction : [instruction];
    if (Object.prototype.hasOwnProperty.call(obj, accessor)) {
      result[key] = deserializer ? deserializer(obj[accessor]) : String(obj[accessor]);
    }
  }
  return result;
};
var deserializeNumber = (value) => value ? Number(value) : void 0;
var deserializeBoolean = (value) => {
  return value ? value === "true" : void 0;
};
var deserializeTimestamp = (value) => {
  return value ? new Date(value) : void 0;
};
var emptyArrayGuard = (value, deserializer) => {
  if (value === "") {
    return [];
  }
  const valueArray = (Array.isArray(value) ? value : [value]).filter((e) => e != null);
  return deserializer(valueArray);
};
var deserializeMetadata = (headers) => {
  const objectMetadataHeaderPrefix = "x-amz-meta-";
  const deserialized = Object.keys(headers).filter((header) => header.startsWith(objectMetadataHeaderPrefix)).reduce((acc, header) => {
    acc[header.replace(objectMetadataHeaderPrefix, "")] = headers[header];
    return acc;
  }, {});
  return Object.keys(deserialized).length > 0 ? deserialized : void 0;
};
var buildStorageServiceError = (error, statusCode) => {
  const storageError = new StorageError({
    name: error.name,
    message: error.message
  });
  if (statusCode === 404) {
    storageError.recoverySuggestion = "Please add the object with this key to the bucket as the key is not found.";
  }
  return storageError;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs
var assignStringVariables = (values) => {
  const queryParams = {};
  for (const [key, value] of Object.entries(values)) {
    if (value != null) {
      queryParams[key] = value.toString();
    }
  }
  return queryParams;
};
var serializeObjectConfigsToHeaders = async (input) => {
  var _a;
  return {
    ...assignStringVariables({
      "x-amz-acl": input.ACL,
      "cache-control": input.CacheControl,
      "content-disposition": input.ContentDisposition,
      "content-language": input.ContentLanguage,
      "content-encoding": input.ContentEncoding,
      "content-type": input.ContentType,
      expires: (_a = input.Expires) == null ? void 0 : _a.toUTCString(),
      "x-amz-tagging": input.Tagging,
      ...serializeMetadata(input.Metadata)
    })
  };
};
var serializeMetadata = (metadata = {}) => Object.keys(metadata).reduce((acc, suffix) => {
  acc[`x-amz-meta-${suffix.toLowerCase()}`] = metadata[suffix];
  return acc;
}, {});
var serializePathnameObjectKey = (url, key) => {
  return url.pathname.replace(/\/$/, "") + `/${key.split("/").map(extendedEncodeURIComponent).join("/")}`;
};
function validateS3RequiredParameter(assertion, paramName) {
  if (!assertion) {
    throw new StorageError({
      name: AmplifyErrorCode.Unknown,
      message: "An unknown error has occurred.",
      underlyingError: new TypeError(`Expected a non-null value for S3 parameter ${paramName}`),
      recoverySuggestion: "This is likely to be a bug. Please reach out to library authors."
    });
  }
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/getObject.mjs
var USER_AGENT_HEADER = "x-amz-user-agent";
var getObjectSerializer = async (input, endpoint) => {
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  return {
    method: "GET",
    headers: {
      ...input.Range && { Range: input.Range }
    },
    url
  };
};
var getObjectDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    return {
      ...map(response.headers, {
        DeleteMarker: ["x-amz-delete-marker", deserializeBoolean],
        AcceptRanges: "accept-ranges",
        Expiration: "x-amz-expiration",
        Restore: "x-amz-restore",
        LastModified: ["last-modified", deserializeTimestamp],
        ContentLength: ["content-length", deserializeNumber],
        ETag: "etag",
        ChecksumCRC32: "x-amz-checksum-crc32",
        ChecksumCRC32C: "x-amz-checksum-crc32c",
        ChecksumSHA1: "x-amz-checksum-sha1",
        ChecksumSHA256: "x-amz-checksum-sha256",
        MissingMeta: ["x-amz-missing-meta", deserializeNumber],
        VersionId: "x-amz-version-id",
        CacheControl: "cache-control",
        ContentDisposition: "content-disposition",
        ContentEncoding: "content-encoding",
        ContentLanguage: "content-language",
        ContentRange: "content-range",
        ContentType: "content-type",
        Expires: ["expires", deserializeTimestamp],
        WebsiteRedirectLocation: "x-amz-website-redirect-location",
        ServerSideEncryption: "x-amz-server-side-encryption",
        SSECustomerAlgorithm: "x-amz-server-side-encryption-customer-algorithm",
        SSECustomerKeyMD5: "x-amz-server-side-encryption-customer-key-md5",
        SSEKMSKeyId: "x-amz-server-side-encryption-aws-kms-key-id",
        BucketKeyEnabled: [
          "x-amz-server-side-encryption-bucket-key-enabled",
          deserializeBoolean
        ],
        StorageClass: "x-amz-storage-class",
        RequestCharged: "x-amz-request-charged",
        ReplicationStatus: "x-amz-replication-status",
        PartsCount: ["x-amz-mp-parts-count", deserializeNumber],
        TagCount: ["x-amz-tagging-count", deserializeNumber],
        ObjectLockMode: "x-amz-object-lock-mode",
        ObjectLockRetainUntilDate: [
          "x-amz-object-lock-retain-until-date",
          deserializeTimestamp
        ],
        ObjectLockLegalHoldStatus: "x-amz-object-lock-legal-hold"
      }),
      Metadata: deserializeMetadata(response.headers),
      $metadata: parseMetadata(response),
      // @ts-expect-error The body is a CompatibleHttpResponse type because the lower-level handler is XHR instead of
      // fetch, which represents payload in Blob instread of ReadableStream.
      Body: response.body
    };
  }
};
var getObject = composeServiceApi(s3TransferHandler, getObjectSerializer, getObjectDeserializer, { ...defaultConfig, responseType: "blob" });
var getPresignedGetObjectUrl = async (config, input) => {
  const endpoint = defaultConfig.endpointResolver(config, input);
  const { url, headers, method } = await getObjectSerializer(input, endpoint);
  url.searchParams.append(CONTENT_SHA256_HEADER, EMPTY_HASH);
  if (config.userAgentValue) {
    url.searchParams.append(config.userAgentHeader ?? USER_AGENT_HEADER, config.userAgentValue);
  }
  if (input.ResponseContentType) {
    url.searchParams.append("response-content-type", input.ResponseContentType);
  }
  if (input.ResponseContentDisposition) {
    url.searchParams.append("response-content-disposition", input.ResponseContentDisposition);
  }
  for (const [headerName, value] of Object.entries(headers).sort(([key1], [key2]) => key1.localeCompare(key2))) {
    url.searchParams.append(headerName, value);
  }
  return presignUrl({ method, url, body: void 0 }, {
    signingService: defaultConfig.service,
    signingRegion: config.region,
    ...defaultConfig,
    ...config
  });
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/listObjectsV2.mjs
var import_fast_xml_parser4 = __toESM(require_fast_xml_parser(), 1);
var import_buffer4 = __toESM(require_buffer(), 1);
var listObjectsV2Serializer = (input, endpoint) => {
  const headers = assignStringVariables({
    "x-amz-request-payer": input.RequestPayer,
    "x-amz-expected-bucket-owner": input.ExpectedBucketOwner
  });
  const query = assignStringVariables({
    "list-type": "2",
    "continuation-token": input.ContinuationToken,
    delimiter: input.Delimiter,
    "encoding-type": input.EncodingType,
    "fetch-owner": input.FetchOwner,
    "max-keys": input.MaxKeys,
    prefix: input.Prefix,
    "start-after": input.StartAfter
  });
  const url = new AmplifyUrl(endpoint.url.toString());
  url.search = new AmplifyUrlSearchParams(query).toString();
  return {
    method: "GET",
    headers,
    url
  };
};
var listObjectsV2Deserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    const parsed = await parseXmlBody(response);
    const contents = map(parsed, {
      CommonPrefixes: [
        "CommonPrefixes",
        (value) => emptyArrayGuard(value, deserializeCommonPrefixList)
      ],
      Contents: [
        "Contents",
        (value) => emptyArrayGuard(value, deserializeObjectList)
      ],
      ContinuationToken: "ContinuationToken",
      Delimiter: "Delimiter",
      EncodingType: "EncodingType",
      IsTruncated: ["IsTruncated", deserializeBoolean],
      KeyCount: ["KeyCount", deserializeNumber],
      MaxKeys: ["MaxKeys", deserializeNumber],
      Name: "Name",
      NextContinuationToken: "NextContinuationToken",
      Prefix: "Prefix",
      StartAfter: "StartAfter"
    });
    return {
      $metadata: parseMetadata(response),
      ...contents
    };
  }
};
var deserializeCommonPrefixList = (output) => output.map(deserializeCommonPrefix);
var deserializeCommonPrefix = (output) => map(output, {
  Prefix: "Prefix"
});
var deserializeObjectList = (output) => output.map(deserializeObject);
var deserializeObject = (output) => map(output, {
  Key: "Key",
  LastModified: ["LastModified", deserializeTimestamp],
  ETag: "ETag",
  ChecksumAlgorithm: [
    "ChecksumAlgorithm",
    (value) => emptyArrayGuard(value, deserializeChecksumAlgorithmList)
  ],
  Size: ["Size", deserializeNumber],
  StorageClass: "StorageClass",
  Owner: ["Owner", deserializeOwner]
});
var deserializeChecksumAlgorithmList = (output) => output.map((entry) => String(entry));
var deserializeOwner = (output) => map(output, { DisplayName: "DisplayName", ID: "ID" });
var listObjectsV2 = composeServiceApi(s3TransferHandler, listObjectsV2Serializer, listObjectsV2Deserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/putObject.mjs
var import_fast_xml_parser5 = __toESM(require_fast_xml_parser(), 1);
var import_buffer5 = __toESM(require_buffer(), 1);
var putObjectSerializer = async (input, endpoint) => {
  const headers = {
    ...await serializeObjectConfigsToHeaders({
      ...input,
      ContentType: input.ContentType ?? "application/octet-stream"
    }),
    ...assignStringVariables({ "content-md5": input.ContentMD5 })
  };
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  return {
    method: "PUT",
    headers,
    url,
    body: input.Body
  };
};
var putObjectDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    return {
      ...map(response.headers, {
        ETag: "etag",
        VersionId: "x-amz-version-id"
      }),
      $metadata: parseMetadata(response)
    };
  }
};
var putObject = composeServiceApi(s3TransferHandler, putObjectSerializer, putObjectDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/createMultipartUpload.mjs
var import_fast_xml_parser6 = __toESM(require_fast_xml_parser(), 1);
var import_buffer6 = __toESM(require_buffer(), 1);
var createMultipartUploadSerializer = async (input, endpoint) => {
  const headers = await serializeObjectConfigsToHeaders(input);
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  url.search = "uploads";
  return {
    method: "POST",
    headers,
    url
  };
};
var createMultipartUploadDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    const parsed = await parseXmlBody(response);
    const contents = map(parsed, {
      UploadId: "UploadId"
    });
    return {
      $metadata: parseMetadata(response),
      ...contents
    };
  }
};
var createMultipartUpload = composeServiceApi(s3TransferHandler, createMultipartUploadSerializer, createMultipartUploadDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/uploadPart.mjs
var import_fast_xml_parser7 = __toESM(require_fast_xml_parser(), 1);
var import_buffer7 = __toESM(require_buffer(), 1);
var uploadPartSerializer = async (input, endpoint) => {
  const headers = {
    ...assignStringVariables({ "content-md5": input.ContentMD5 })
  };
  headers["content-type"] = "application/octet-stream";
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  validateS3RequiredParameter(!!input.PartNumber, "PartNumber");
  validateS3RequiredParameter(!!input.UploadId, "UploadId");
  url.search = new AmplifyUrlSearchParams({
    partNumber: input.PartNumber + "",
    uploadId: input.UploadId
  }).toString();
  return {
    method: "PUT",
    headers,
    url,
    body: input.Body
  };
};
var uploadPartDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    return {
      ...map(response.headers, {
        ETag: "etag"
      }),
      $metadata: parseMetadata(response)
    };
  }
};
var uploadPart = composeServiceApi(s3TransferHandler, uploadPartSerializer, uploadPartDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/completeMultipartUpload.mjs
var import_fast_xml_parser8 = __toESM(require_fast_xml_parser(), 1);
var import_buffer8 = __toESM(require_buffer(), 1);
var INVALID_PARAMETER_ERROR_MSG = "Invalid parameter for ComplteMultipartUpload API";
var completeMultipartUploadSerializer = async (input, endpoint) => {
  const headers = {
    "content-type": "application/xml"
  };
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  validateS3RequiredParameter(!!input.UploadId, "UploadId");
  url.search = new AmplifyUrlSearchParams({
    uploadId: input.UploadId
  }).toString();
  validateS3RequiredParameter(!!input.MultipartUpload, "MultipartUpload");
  return {
    method: "POST",
    headers,
    url,
    body: '<?xml version="1.0" encoding="UTF-8"?>' + serializeCompletedMultipartUpload(input.MultipartUpload)
  };
};
var serializeCompletedMultipartUpload = (input) => {
  var _a;
  if (!((_a = input.Parts) == null ? void 0 : _a.length)) {
    throw new Error(`${INVALID_PARAMETER_ERROR_MSG}: ${input}`);
  }
  return `<CompleteMultipartUpload xmlns="http://s3.amazonaws.com/doc/2006-03-01/">${input.Parts.map(serializeCompletedPartList).join("")}</CompleteMultipartUpload>`;
};
var serializeCompletedPartList = (input) => {
  if (!input.ETag || input.PartNumber == null) {
    throw new Error(`${INVALID_PARAMETER_ERROR_MSG}: ${input}`);
  }
  return `<Part><ETag>${input.ETag}</ETag><PartNumber>${input.PartNumber}</PartNumber></Part>`;
};
var parseXmlBodyOrThrow = async (response) => {
  const parsed = await parseXmlBody(response);
  if (parsed.Code !== void 0 && parsed.Message !== void 0) {
    const error = await parseXmlError({
      ...response,
      statusCode: 500
      // To workaround the >=300 status code check common to other APIs.
    });
    throw buildStorageServiceError(error, response.statusCode);
  }
  return parsed;
};
var completeMultipartUploadDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    const parsed = await parseXmlBodyOrThrow(response);
    const contents = map(parsed, {
      ETag: "ETag",
      Key: "Key",
      Location: "Location"
    });
    return {
      $metadata: parseMetadata(response),
      ...contents
    };
  }
};
var retryWhenErrorWith200StatusCode = async (response, error) => {
  if (!response) {
    return false;
  }
  if (response.statusCode === 200) {
    if (!response.body) {
      return true;
    }
    const parsed = await parseXmlBody(response);
    if (parsed.Code !== void 0 && parsed.Message !== void 0) {
      return true;
    }
    return false;
  }
  const defaultRetryDecider = defaultConfig.retryDecider;
  return defaultRetryDecider(response, error);
};
var completeMultipartUpload = composeServiceApi(s3TransferHandler, completeMultipartUploadSerializer, completeMultipartUploadDeserializer, {
  ...defaultConfig,
  responseType: "text",
  retryDecider: retryWhenErrorWith200StatusCode
});

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/listParts.mjs
var import_fast_xml_parser9 = __toESM(require_fast_xml_parser(), 1);
var import_buffer9 = __toESM(require_buffer(), 1);
var listPartsSerializer = async (input, endpoint) => {
  const headers = {};
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  validateS3RequiredParameter(!!input.UploadId, "UploadId");
  url.search = new AmplifyUrlSearchParams({
    uploadId: input.UploadId
  }).toString();
  return {
    method: "GET",
    headers,
    url
  };
};
var listPartsDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    const parsed = await parseXmlBody(response);
    const contents = map(parsed, {
      UploadId: "UploadId",
      Parts: [
        "Part",
        (value) => emptyArrayGuard(value, deserializeCompletedPartList)
      ]
    });
    return {
      $metadata: parseMetadata(response),
      ...contents
    };
  }
};
var deserializeCompletedPartList = (input) => input.map((item) => map(item, {
  PartNumber: ["PartNumber", deserializeNumber],
  ETag: "ETag",
  Size: ["Size", deserializeNumber]
}));
var listParts = composeServiceApi(s3TransferHandler, listPartsSerializer, listPartsDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/abortMultipartUpload.mjs
var import_fast_xml_parser10 = __toESM(require_fast_xml_parser(), 1);
var import_buffer10 = __toESM(require_buffer(), 1);
var abortMultipartUploadSerializer = (input, endpoint) => {
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  validateS3RequiredParameter(!!input.UploadId, "UploadId");
  url.search = new AmplifyUrlSearchParams({
    uploadId: input.UploadId
  }).toString();
  return {
    method: "DELETE",
    headers: {},
    url
  };
};
var abortMultipartUploadDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    return {
      $metadata: parseMetadata(response)
    };
  }
};
var abortMultipartUpload = composeServiceApi(s3TransferHandler, abortMultipartUploadSerializer, abortMultipartUploadDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/copyObject.mjs
var import_fast_xml_parser11 = __toESM(require_fast_xml_parser(), 1);
var import_buffer11 = __toESM(require_buffer(), 1);
var copyObjectSerializer = async (input, endpoint) => {
  const headers = {
    ...await serializeObjectConfigsToHeaders(input),
    ...assignStringVariables({
      "x-amz-copy-source": input.CopySource,
      "x-amz-metadata-directive": input.MetadataDirective
    })
  };
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  return {
    method: "PUT",
    headers,
    url
  };
};
var copyObjectDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    await parseXmlBody(response);
    return {
      $metadata: parseMetadata(response)
    };
  }
};
var copyObject = composeServiceApi(s3TransferHandler, copyObjectSerializer, copyObjectDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/headObject.mjs
var import_fast_xml_parser12 = __toESM(require_fast_xml_parser(), 1);
var import_buffer12 = __toESM(require_buffer(), 1);
var headObjectSerializer = async (input, endpoint) => {
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  return {
    method: "HEAD",
    headers: {},
    url
  };
};
var headObjectDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    const contents = {
      ...map(response.headers, {
        ContentLength: ["content-length", deserializeNumber],
        ContentType: "content-type",
        ETag: "etag",
        LastModified: ["last-modified", deserializeTimestamp],
        VersionId: "x-amz-version-id"
      }),
      Metadata: deserializeMetadata(response.headers)
    };
    return {
      $metadata: parseMetadata(response),
      ...contents
    };
  }
};
var headObject = composeServiceApi(s3TransferHandler, headObjectSerializer, headObjectDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/client/deleteObject.mjs
var import_fast_xml_parser13 = __toESM(require_fast_xml_parser(), 1);
var import_buffer13 = __toESM(require_buffer(), 1);
var deleteObjectSerializer = (input, endpoint) => {
  const url = new AmplifyUrl(endpoint.url.toString());
  validateS3RequiredParameter(!!input.Key, "Key");
  url.pathname = serializePathnameObjectKey(url, input.Key);
  return {
    method: "DELETE",
    headers: {},
    url
  };
};
var deleteObjectDeserializer = async (response) => {
  if (response.statusCode >= 300) {
    const error = await parseXmlError(response);
    throw buildStorageServiceError(error, response.statusCode);
  } else {
    const content = map(response.headers, {
      DeleteMarker: ["x-amz-delete-marker", deserializeBoolean],
      VersionId: "x-amz-version-id",
      RequestCharged: "x-amz-request-charged"
    });
    return {
      ...content,
      $metadata: parseMetadata(response)
    };
  }
};
var deleteObject = composeServiceApi(s3TransferHandler, deleteObjectSerializer, deleteObjectDeserializer, { ...defaultConfig, responseType: "text" });

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/userAgent.mjs
function getStorageUserAgentValue(action) {
  return getAmplifyUserAgent({
    category: Category.Storage,
    action
  });
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/constructContentDisposition.mjs
var constructContentDisposition = (contentDisposition) => {
  if (!contentDisposition)
    return void 0;
  if (typeof contentDisposition === "string")
    return contentDisposition;
  const { type, filename } = contentDisposition;
  return filename !== void 0 ? `${type}; filename="${filename}"` : type;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/putObjectJob.mjs
var putObjectJob = (uploadDataInput, abortSignal, totalLength) => async () => {
  const { options: uploadDataOptions, data } = uploadDataInput;
  const { bucket, keyPrefix, s3Config, isObjectLockEnabled, identityId } = await resolveS3ConfigAndInput(Amplify, uploadDataOptions);
  const { inputType, objectKey } = validateStorageOperationInput(uploadDataInput, identityId);
  const finalKey = inputType === STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
  const { contentDisposition, contentEncoding, contentType = "application/octet-stream", metadata, onProgress } = uploadDataOptions ?? {};
  const { ETag: eTag, VersionId: versionId } = await putObject({
    ...s3Config,
    abortSignal,
    onUploadProgress: onProgress,
    userAgentValue: getStorageUserAgentValue(StorageAction.UploadData)
  }, {
    Bucket: bucket,
    Key: finalKey,
    Body: data,
    ContentType: contentType,
    ContentDisposition: constructContentDisposition(contentDisposition),
    ContentEncoding: contentEncoding,
    Metadata: metadata,
    ContentMD5: isObjectLockEnabled ? await calculateContentMd5(data) : void 0
  });
  const result = {
    eTag,
    versionId,
    contentType,
    metadata,
    size: totalLength
  };
  return inputType === STORAGE_INPUT_KEY ? { key: objectKey, ...result } : { path: objectKey, ...result };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/uploadHandlers.mjs
var import_fast_xml_parser14 = __toESM(require_fast_xml_parser(), 1);
var import_buffer14 = __toESM(require_buffer(), 1);

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/uploadPartExecutor.mjs
var uploadPartExecutor = async ({ dataChunkerGenerator, completedPartNumberSet, s3Config, abortSignal, bucket, finalKey, uploadId, onPartUploadCompletion, onProgress, isObjectLockEnabled }) => {
  let transferredBytes = 0;
  for (const { data, partNumber, size } of dataChunkerGenerator) {
    if (abortSignal.aborted) {
      logger2.debug("upload executor aborted.");
      break;
    }
    if (completedPartNumberSet.has(partNumber)) {
      logger2.debug(`part ${partNumber} already uploaded.`);
      transferredBytes += size;
      onProgress == null ? void 0 : onProgress({
        transferredBytes
      });
    } else {
      const { ETag: eTag } = await uploadPart({
        ...s3Config,
        abortSignal,
        onUploadProgress: (event) => {
          const { transferredBytes: currentPartTransferredBytes } = event;
          onProgress == null ? void 0 : onProgress({
            transferredBytes: transferredBytes + currentPartTransferredBytes
          });
        }
      }, {
        Bucket: bucket,
        Key: finalKey,
        UploadId: uploadId,
        Body: data,
        PartNumber: partNumber,
        ContentMD5: isObjectLockEnabled ? await calculateContentMd5(data) : void 0
      });
      transferredBytes += size;
      onPartUploadCompletion(partNumber, eTag);
    }
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/uploadCache.mjs
var ONE_HOUR = 1e3 * 60 * 60;
var findCachedUploadParts = async ({ cacheKey, s3Config, bucket, finalKey }) => {
  const cachedUploads = await listCachedUploadTasks(defaultStorage);
  if (!cachedUploads[cacheKey] || cachedUploads[cacheKey].lastTouched < Date.now() - ONE_HOUR) {
    return null;
  }
  const cachedUpload = cachedUploads[cacheKey];
  cachedUpload.lastTouched = Date.now();
  await defaultStorage.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
  try {
    const { Parts = [] } = await listParts(s3Config, {
      Bucket: bucket,
      Key: finalKey,
      UploadId: cachedUpload.uploadId
    });
    return {
      parts: Parts,
      uploadId: cachedUpload.uploadId
    };
  } catch (e) {
    logger2.debug("failed to list cached parts, removing cached upload.");
    await removeCachedUpload(cacheKey);
    return null;
  }
};
var listCachedUploadTasks = async (kvStorage) => {
  try {
    return JSON.parse(await kvStorage.getItem(UPLOADS_STORAGE_KEY) ?? "{}");
  } catch (e) {
    logger2.debug("failed to parse cached uploads record.");
    return {};
  }
};
var getUploadsCacheKey = ({ file, size, contentType, bucket, accessLevel, key }) => {
  let levelStr;
  const resolvedContentType = contentType ?? (file == null ? void 0 : file.type) ?? "application/octet-stream";
  if (accessLevel === void 0) {
    levelStr = "custom";
  } else {
    levelStr = accessLevel === "guest" ? "public" : accessLevel;
  }
  const baseId = `${size}_${resolvedContentType}_${bucket}_${levelStr}_${key}`;
  if (file) {
    return `${file.name}_${file.lastModified}_${baseId}`;
  } else {
    return baseId;
  }
};
var cacheMultipartUpload = async (cacheKey, fileMetadata) => {
  const cachedUploads = await listCachedUploadTasks(defaultStorage);
  cachedUploads[cacheKey] = {
    ...fileMetadata,
    lastTouched: Date.now()
  };
  await defaultStorage.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};
var removeCachedUpload = async (cacheKey) => {
  const cachedUploads = await listCachedUploadTasks(defaultStorage);
  delete cachedUploads[cacheKey];
  await defaultStorage.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/progressTracker.mjs
var getConcurrentUploadsProgressTracker = ({ size, onProgress }) => {
  const transferredBytesPerListener = [];
  const getTransferredBytes = () => transferredBytesPerListener.reduce((acc, transferredBytes) => acc + transferredBytes, 0);
  return {
    getOnProgressListener: () => {
      transferredBytesPerListener.push(0);
      const listenerIndex = transferredBytesPerListener.length - 1;
      return (event) => {
        const { transferredBytes } = event;
        transferredBytesPerListener[listenerIndex] = transferredBytes;
        onProgress == null ? void 0 : onProgress({
          transferredBytes: getTransferredBytes(),
          totalBytes: size
        });
      };
    }
  };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/initialUpload.mjs
var loadOrCreateMultipartUpload = async ({ s3Config, data, size, contentType, bucket, accessLevel, keyPrefix, key, contentDisposition, contentEncoding, metadata, abortSignal }) => {
  const finalKey = keyPrefix !== void 0 ? keyPrefix + key : key;
  let cachedUpload;
  if (size === void 0) {
    logger2.debug("uploaded data size cannot be determined, skipping cache.");
    cachedUpload = void 0;
  } else {
    const uploadCacheKey = getUploadsCacheKey({
      size,
      contentType,
      file: data instanceof File ? data : void 0,
      bucket,
      accessLevel,
      key
    });
    const cachedUploadParts = await findCachedUploadParts({
      s3Config,
      cacheKey: uploadCacheKey,
      bucket,
      finalKey
    });
    cachedUpload = cachedUploadParts ? { ...cachedUploadParts, uploadCacheKey } : void 0;
  }
  if (cachedUpload) {
    return {
      uploadId: cachedUpload.uploadId,
      cachedParts: cachedUpload.parts
    };
  } else {
    const { UploadId } = await createMultipartUpload({
      ...s3Config,
      abortSignal
    }, {
      Bucket: bucket,
      Key: finalKey,
      ContentType: contentType,
      ContentDisposition: constructContentDisposition(contentDisposition),
      ContentEncoding: contentEncoding,
      Metadata: metadata
    });
    if (size === void 0) {
      logger2.debug("uploaded data size cannot be determined, skipping cache.");
      return {
        uploadId: UploadId,
        cachedParts: []
      };
    }
    const uploadCacheKey = getUploadsCacheKey({
      size,
      contentType,
      file: data instanceof File ? data : void 0,
      bucket,
      accessLevel,
      key
    });
    await cacheMultipartUpload(uploadCacheKey, {
      uploadId: UploadId,
      bucket,
      key,
      fileName: data instanceof File ? data.name : ""
    });
    return {
      uploadId: UploadId,
      cachedParts: []
    };
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/calculatePartSize.mjs
var calculatePartSize = (totalSize) => {
  if (!totalSize) {
    return DEFAULT_PART_SIZE;
  }
  let partSize = DEFAULT_PART_SIZE;
  let partsCount = Math.ceil(totalSize / partSize);
  while (partsCount > MAX_PARTS_COUNT) {
    partSize *= 2;
    partsCount = Math.ceil(totalSize / partSize);
  }
  return partSize;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/getDataChunker.mjs
var getDataChunker = (data, totalSize) => {
  const partSize = calculatePartSize(totalSize);
  if (data instanceof Blob) {
    return helper(data, 0, data.size, partSize);
  } else if (ArrayBuffer.isView(data)) {
    return helper(data.buffer, data.byteOffset, data.byteLength, partSize);
  } else if (data instanceof ArrayBuffer) {
    return helper(data, 0, data.byteLength, partSize);
  } else if (typeof data === "string") {
    const blob = new Blob([data]);
    return getDataChunker(blob, blob.size);
  } else {
    throw new StorageError({
      name: StorageValidationErrorCode.InvalidUploadSource,
      ...validationErrorMap[StorageValidationErrorCode.InvalidUploadSource]
    });
  }
};
var helper = function* (buffer, byteOffset, byteLength2, partSize) {
  let partNumber = 1;
  let startByte = byteOffset;
  let endByte = byteOffset + Math.min(partSize, byteLength2);
  while (endByte < byteLength2 + byteOffset) {
    yield {
      partNumber,
      data: buffer.slice(startByte, endByte),
      size: partSize
    };
    partNumber += 1;
    startByte = endByte;
    endByte = startByte + partSize;
  }
  yield {
    partNumber,
    data: buffer.slice(startByte, byteLength2 + byteOffset),
    size: byteLength2 + byteOffset - startByte
  };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/multipart/uploadHandlers.mjs
var getMultipartUploadHandlers = (uploadDataInput, size) => {
  let resolveCallback;
  let rejectCallback;
  let inProgressUpload;
  let resolvedS3Config;
  let abortController;
  let resolvedAccessLevel;
  let resolvedBucket;
  let resolvedKeyPrefix;
  let resolvedIdentityId;
  let uploadCacheKey;
  let finalKey;
  let isAbortSignalFromPause = false;
  const startUpload = async () => {
    const { options: uploadDataOptions, data } = uploadDataInput;
    const resolvedS3Options = await resolveS3ConfigAndInput(Amplify, uploadDataOptions);
    abortController = new AbortController();
    isAbortSignalFromPause = false;
    resolvedS3Config = resolvedS3Options.s3Config;
    resolvedBucket = resolvedS3Options.bucket;
    resolvedIdentityId = resolvedS3Options.identityId;
    const { inputType, objectKey } = validateStorageOperationInput(uploadDataInput, resolvedIdentityId);
    const { contentDisposition, contentEncoding, contentType = "application/octet-stream", metadata, onProgress } = uploadDataOptions ?? {};
    finalKey = objectKey;
    if (inputType === STORAGE_INPUT_KEY) {
      const accessLevel = uploadDataOptions == null ? void 0 : uploadDataOptions.accessLevel;
      resolvedKeyPrefix = resolvedS3Options.keyPrefix;
      finalKey = resolvedKeyPrefix + objectKey;
      resolvedAccessLevel = resolveAccessLevel(accessLevel);
    }
    if (!inProgressUpload) {
      const { uploadId, cachedParts } = await loadOrCreateMultipartUpload({
        s3Config: resolvedS3Config,
        accessLevel: resolvedAccessLevel,
        bucket: resolvedBucket,
        keyPrefix: resolvedKeyPrefix,
        key: objectKey,
        contentType,
        contentDisposition,
        contentEncoding,
        metadata,
        data,
        size,
        abortSignal: abortController.signal
      });
      inProgressUpload = {
        uploadId,
        completedParts: cachedParts
      };
    }
    uploadCacheKey = size ? getUploadsCacheKey({
      file: data instanceof File ? data : void 0,
      accessLevel: resolvedAccessLevel,
      contentType: uploadDataOptions == null ? void 0 : uploadDataOptions.contentType,
      bucket: resolvedBucket,
      size,
      key: objectKey
    }) : void 0;
    const dataChunker = getDataChunker(data, size);
    const completedPartNumberSet = new Set(inProgressUpload.completedParts.map(({ PartNumber }) => PartNumber));
    const onPartUploadCompletion = (partNumber, eTag2) => {
      inProgressUpload == null ? void 0 : inProgressUpload.completedParts.push({
        PartNumber: partNumber,
        ETag: eTag2
      });
    };
    const concurrentUploadsProgressTracker = getConcurrentUploadsProgressTracker({
      size,
      onProgress
    });
    const concurrentUploadPartExecutors = [];
    for (let index = 0; index < DEFAULT_QUEUE_SIZE; index++) {
      concurrentUploadPartExecutors.push(uploadPartExecutor({
        dataChunkerGenerator: dataChunker,
        completedPartNumberSet,
        s3Config: resolvedS3Config,
        abortSignal: abortController.signal,
        bucket: resolvedBucket,
        finalKey,
        uploadId: inProgressUpload.uploadId,
        onPartUploadCompletion,
        onProgress: concurrentUploadsProgressTracker.getOnProgressListener(),
        isObjectLockEnabled: resolvedS3Options.isObjectLockEnabled
      }));
    }
    await Promise.all(concurrentUploadPartExecutors);
    const { ETag: eTag } = await completeMultipartUpload({
      ...resolvedS3Config,
      abortSignal: abortController.signal,
      userAgentValue: getStorageUserAgentValue(StorageAction.UploadData)
    }, {
      Bucket: resolvedBucket,
      Key: finalKey,
      UploadId: inProgressUpload.uploadId,
      MultipartUpload: {
        Parts: inProgressUpload.completedParts.sort((partA, partB) => partA.PartNumber - partB.PartNumber)
      }
    });
    if (size) {
      const { ContentLength: uploadedObjectSize } = await headObject(resolvedS3Config, {
        Bucket: resolvedBucket,
        Key: finalKey
      });
      if (uploadedObjectSize && uploadedObjectSize !== size) {
        throw new StorageError({
          name: "Error",
          message: `Upload failed. Expected object size ${size}, but got ${uploadedObjectSize}.`
        });
      }
    }
    if (uploadCacheKey) {
      await removeCachedUpload(uploadCacheKey);
    }
    const result = {
      eTag,
      contentType,
      metadata
    };
    return inputType === STORAGE_INPUT_KEY ? { key: objectKey, ...result } : { path: objectKey, ...result };
  };
  const startUploadWithResumability = () => startUpload().then(resolveCallback).catch((error) => {
    const abortSignal = abortController == null ? void 0 : abortController.signal;
    if ((abortSignal == null ? void 0 : abortSignal.aborted) && isAbortSignalFromPause) {
      logger2.debug("upload paused.");
    } else {
      rejectCallback(error);
    }
  });
  const multipartUploadJob = () => new Promise((resolve, reject) => {
    resolveCallback = resolve;
    rejectCallback = reject;
    startUploadWithResumability();
  });
  const onPause = () => {
    isAbortSignalFromPause = true;
    abortController == null ? void 0 : abortController.abort();
  };
  const onResume = () => {
    startUploadWithResumability();
  };
  const onCancel = (message) => {
    abortController == null ? void 0 : abortController.abort(message);
    const cancelUpload = async () => {
      if (uploadCacheKey) {
        await removeCachedUpload(uploadCacheKey);
      }
      await abortMultipartUpload(resolvedS3Config, {
        Bucket: resolvedBucket,
        Key: finalKey,
        UploadId: inProgressUpload == null ? void 0 : inProgressUpload.uploadId
      });
    };
    cancelUpload().catch((e) => {
      logger2.debug("error when cancelling upload task.", e);
    });
    rejectCallback(
      // Internal error that should not be exposed to the users. They should use isCancelError() to check if
      // the error is caused by cancel().
      new CanceledError(message ? { message } : void 0)
    );
  };
  return {
    multipartUploadJob,
    onPause,
    onResume,
    onCancel
  };
};
var resolveAccessLevel = (accessLevel) => {
  var _a, _b;
  return accessLevel ?? ((_b = (_a = Amplify.libraryOptions.Storage) == null ? void 0 : _a.S3) == null ? void 0 : _b.defaultAccessLevel) ?? DEFAULT_ACCESS_LEVEL;
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/uploadData/index.mjs
function uploadData(input) {
  const { data } = input;
  const dataByteLength = byteLength(data);
  assertValidationError(dataByteLength === void 0 || dataByteLength <= MAX_OBJECT_SIZE, StorageValidationErrorCode.ObjectIsTooLarge);
  if (dataByteLength !== void 0 && dataByteLength <= DEFAULT_PART_SIZE) {
    const abortController = new AbortController();
    return createUploadTask({
      isMultipartUpload: false,
      job: putObjectJob(input, abortController.signal, dataByteLength),
      onCancel: (message) => {
        abortController.abort(message);
      }
    });
  } else {
    const { multipartUploadJob, onPause, onResume, onCancel } = getMultipartUploadHandlers(input, dataByteLength);
    return createUploadTask({
      isMultipartUpload: true,
      job: multipartUploadJob,
      onCancel: (message) => {
        onCancel(message);
      },
      onPause,
      onResume
    });
  }
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/downloadData.mjs
var import_fast_xml_parser16 = __toESM(require_fast_xml_parser(), 1);
var import_buffer16 = __toESM(require_buffer(), 1);
function downloadData(input) {
  const abortController = new AbortController();
  const downloadTask = createDownloadTask({
    job: downloadDataJob(input, abortController.signal),
    onCancel: (message) => {
      abortController.abort(message);
    }
  });
  return downloadTask;
}
var downloadDataJob = (downloadDataInput, abortSignal) => async () => {
  const { options: downloadDataOptions } = downloadDataInput;
  const { bucket, keyPrefix, s3Config, identityId } = await resolveS3ConfigAndInput(Amplify, downloadDataOptions);
  const { inputType, objectKey } = validateStorageOperationInput(downloadDataInput, identityId);
  const finalKey = inputType === STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
  logger2.debug(`download ${objectKey} from ${finalKey}.`);
  const { Body: body, LastModified: lastModified, ContentLength: size, ETag: eTag, Metadata: metadata, VersionId: versionId, ContentType: contentType } = await getObject({
    ...s3Config,
    abortSignal,
    onDownloadProgress: downloadDataOptions == null ? void 0 : downloadDataOptions.onProgress,
    userAgentValue: getStorageUserAgentValue(StorageAction.DownloadData)
  }, {
    Bucket: bucket,
    Key: finalKey,
    ...(downloadDataOptions == null ? void 0 : downloadDataOptions.bytesRange) && {
      Range: `bytes=${downloadDataOptions.bytesRange.start}-${downloadDataOptions.bytesRange.end}`
    }
  });
  const result = {
    body,
    lastModified,
    size,
    contentType,
    eTag,
    metadata,
    versionId
  };
  return inputType === STORAGE_INPUT_KEY ? { key: objectKey, ...result } : { path: objectKey, ...result };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/internal/remove.mjs
var import_fast_xml_parser17 = __toESM(require_fast_xml_parser(), 1);
var import_buffer17 = __toESM(require_buffer(), 1);
var remove = async (amplify, input) => {
  const { options = {} } = input ?? {};
  const { s3Config, keyPrefix, bucket, identityId } = await resolveS3ConfigAndInput(amplify, options);
  const { inputType, objectKey } = validateStorageOperationInput(input, identityId);
  let finalKey;
  if (inputType === STORAGE_INPUT_KEY) {
    finalKey = `${keyPrefix}${objectKey}`;
    logger2.debug(`remove "${objectKey}" from "${finalKey}".`);
  } else {
    finalKey = objectKey;
    logger2.debug(`removing object in path "${finalKey}"`);
  }
  await deleteObject({
    ...s3Config,
    userAgentValue: getStorageUserAgentValue(StorageAction.Remove)
  }, {
    Bucket: bucket,
    Key: finalKey
  });
  return inputType === STORAGE_INPUT_KEY ? {
    key: objectKey
  } : {
    path: objectKey
  };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/remove.mjs
function remove2(input) {
  return remove(Amplify, input);
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/internal/list.mjs
var import_fast_xml_parser18 = __toESM(require_fast_xml_parser(), 1);
var import_buffer18 = __toESM(require_buffer(), 1);

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/utils/validateStorageOperationInputWithPrefix.mjs
var _isInputWithPath = (input) => {
  return input.path !== void 0;
};
var validateStorageOperationInputWithPrefix = (input, identityId) => {
  assertValidationError(!(input.prefix && input.path), StorageValidationErrorCode.InvalidStorageOperationPrefixInput);
  if (_isInputWithPath(input)) {
    const { path } = input;
    const objectKey = typeof path === "string" ? path : path({ identityId });
    assertValidationError(!objectKey.startsWith("/"), StorageValidationErrorCode.InvalidStoragePathInput);
    return {
      inputType: STORAGE_INPUT_PATH,
      objectKey
    };
  } else {
    return { inputType: STORAGE_INPUT_PREFIX, objectKey: input.prefix ?? "" };
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/internal/list.mjs
var MAX_PAGE_SIZE = 1e3;
var list = async (amplify, input) => {
  const { options = {} } = input;
  const { s3Config, bucket, keyPrefix: generatedPrefix, identityId } = await resolveS3ConfigAndInput(amplify, options);
  const { inputType, objectKey } = validateStorageOperationInputWithPrefix(input, identityId);
  const isInputWithPrefix = inputType === STORAGE_INPUT_PREFIX;
  if ((options == null ? void 0 : options.listAll) && ((options == null ? void 0 : options.pageSize) || (options == null ? void 0 : options.nextToken))) {
    const anyOptions = options;
    logger2.debug(`listAll is set to true, ignoring ${(anyOptions == null ? void 0 : anyOptions.pageSize) ? `pageSize: ${anyOptions == null ? void 0 : anyOptions.pageSize}` : ""} ${(anyOptions == null ? void 0 : anyOptions.nextToken) ? `nextToken: ${anyOptions == null ? void 0 : anyOptions.nextToken}` : ""}.`);
  }
  const listParams = {
    Bucket: bucket,
    Prefix: isInputWithPrefix ? `${generatedPrefix}${objectKey}` : objectKey,
    MaxKeys: (options == null ? void 0 : options.listAll) ? void 0 : options == null ? void 0 : options.pageSize,
    ContinuationToken: (options == null ? void 0 : options.listAll) ? void 0 : options == null ? void 0 : options.nextToken,
    Delimiter: getDelimiter(options)
  };
  logger2.debug(`listing items from "${listParams.Prefix}"`);
  const listInputArgs = {
    s3Config,
    listParams
  };
  if (options.listAll) {
    if (isInputWithPrefix) {
      return _listAllWithPrefix({
        ...listInputArgs,
        generatedPrefix
      });
    } else {
      return _listAllWithPath(listInputArgs);
    }
  } else {
    if (isInputWithPrefix) {
      return _listWithPrefix({ ...listInputArgs, generatedPrefix });
    } else {
      return _listWithPath(listInputArgs);
    }
  }
};
var _listAllWithPrefix = async ({ s3Config, listParams, generatedPrefix }) => {
  const listResult = [];
  let continuationToken = listParams.ContinuationToken;
  do {
    const { items: pageResults, nextToken: pageNextToken } = await _listWithPrefix({
      generatedPrefix,
      s3Config,
      listParams: {
        ...listParams,
        ContinuationToken: continuationToken,
        MaxKeys: MAX_PAGE_SIZE
      }
    });
    listResult.push(...pageResults);
    continuationToken = pageNextToken;
  } while (continuationToken);
  return {
    items: listResult
  };
};
var _listWithPrefix = async ({ s3Config, listParams, generatedPrefix }) => {
  const listParamsClone = { ...listParams };
  if (!listParamsClone.MaxKeys || listParamsClone.MaxKeys > MAX_PAGE_SIZE) {
    logger2.debug(`defaulting pageSize to ${MAX_PAGE_SIZE}.`);
    listParamsClone.MaxKeys = MAX_PAGE_SIZE;
  }
  const response = await listObjectsV2({
    ...s3Config,
    userAgentValue: getStorageUserAgentValue(StorageAction.List)
  }, listParamsClone);
  if (!(response == null ? void 0 : response.Contents)) {
    return {
      items: []
    };
  }
  return {
    items: response.Contents.map((item) => ({
      key: generatedPrefix ? item.Key.substring(generatedPrefix.length) : item.Key,
      eTag: item.ETag,
      lastModified: item.LastModified,
      size: item.Size
    })),
    nextToken: response.NextContinuationToken
  };
};
var _listAllWithPath = async ({ s3Config, listParams }) => {
  const listResult = [];
  const excludedSubpaths = [];
  let continuationToken = listParams.ContinuationToken;
  do {
    const { items: pageResults, excludedSubpaths: pageExcludedSubpaths, nextToken: pageNextToken } = await _listWithPath({
      s3Config,
      listParams: {
        ...listParams,
        ContinuationToken: continuationToken,
        MaxKeys: MAX_PAGE_SIZE
      }
    });
    listResult.push(...pageResults);
    excludedSubpaths.push(...pageExcludedSubpaths ?? []);
    continuationToken = pageNextToken;
  } while (continuationToken);
  return {
    items: listResult,
    excludedSubpaths
  };
};
var _listWithPath = async ({ s3Config, listParams }) => {
  const listParamsClone = { ...listParams };
  if (!listParamsClone.MaxKeys || listParamsClone.MaxKeys > MAX_PAGE_SIZE) {
    logger2.debug(`defaulting pageSize to ${MAX_PAGE_SIZE}.`);
    listParamsClone.MaxKeys = MAX_PAGE_SIZE;
  }
  const { Contents: contents, NextContinuationToken: nextContinuationToken, CommonPrefixes: commonPrefixes } = await listObjectsV2({
    ...s3Config,
    userAgentValue: getStorageUserAgentValue(StorageAction.List)
  }, listParamsClone);
  const excludedSubpaths = commonPrefixes && mapCommonPrefixesToExcludedSubpaths(commonPrefixes);
  if (!contents) {
    return {
      items: [],
      nextToken: nextContinuationToken,
      excludedSubpaths
    };
  }
  return {
    items: contents.map((item) => ({
      path: item.Key,
      eTag: item.ETag,
      lastModified: item.LastModified,
      size: item.Size
    })),
    nextToken: nextContinuationToken,
    excludedSubpaths
  };
};
var mapCommonPrefixesToExcludedSubpaths = (commonPrefixes) => {
  return commonPrefixes.reduce((mappedSubpaths, { Prefix }) => {
    if (Prefix) {
      mappedSubpaths.push(Prefix);
    }
    return mappedSubpaths;
  }, []);
};
var getDelimiter = (options) => {
  var _a, _b;
  if (((_a = options == null ? void 0 : options.subpathStrategy) == null ? void 0 : _a.strategy) === "exclude") {
    return ((_b = options == null ? void 0 : options.subpathStrategy) == null ? void 0 : _b.delimiter) ?? DEFAULT_DELIMITER;
  }
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/list.mjs
function list2(input) {
  return list(Amplify, input ?? {});
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/internal/getProperties.mjs
var import_fast_xml_parser19 = __toESM(require_fast_xml_parser(), 1);
var import_buffer19 = __toESM(require_buffer(), 1);
var getProperties = async (amplify, input, action) => {
  const { options: getPropertiesOptions } = input;
  const { s3Config, bucket, keyPrefix, identityId } = await resolveS3ConfigAndInput(amplify, getPropertiesOptions);
  const { inputType, objectKey } = validateStorageOperationInput(input, identityId);
  const finalKey = inputType === STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
  logger2.debug(`get properties of ${objectKey} from ${finalKey}`);
  const response = await headObject({
    ...s3Config,
    userAgentValue: getStorageUserAgentValue(action ?? StorageAction.GetProperties)
  }, {
    Bucket: bucket,
    Key: finalKey
  });
  const result = {
    contentType: response.ContentType,
    size: response.ContentLength,
    eTag: response.ETag,
    lastModified: response.LastModified,
    metadata: response.Metadata,
    versionId: response.VersionId
  };
  return inputType === STORAGE_INPUT_KEY ? { key: objectKey, ...result } : { path: objectKey, ...result };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/getProperties.mjs
function getProperties2(input) {
  return getProperties(Amplify, input);
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/internal/copy.mjs
var import_fast_xml_parser20 = __toESM(require_fast_xml_parser(), 1);
var import_buffer20 = __toESM(require_buffer(), 1);
var isCopyInputWithPath = (input) => isInputWithPath(input.source);
var storageBucketAssertion = (sourceBucket, destBucket) => {
  assertValidationError(
    // Both src & dest bucket option is present is acceptable
    sourceBucket !== void 0 && destBucket !== void 0 || // or both are undefined is also acceptable
    !destBucket && !sourceBucket,
    StorageValidationErrorCode.InvalidCopyOperationStorageBucket
  );
};
var copy = async (amplify, input) => {
  return isCopyInputWithPath(input) ? copyWithPath(amplify, input) : copyWithKey(amplify, input);
};
var copyWithPath = async (amplify, input) => {
  const { source, destination } = input;
  storageBucketAssertion(source.bucket, destination.bucket);
  const { bucket: sourceBucket, identityId } = await resolveS3ConfigAndInput(amplify, input.source);
  const { s3Config, bucket: destBucket } = await resolveS3ConfigAndInput(amplify, input.destination);
  assertValidationError(!!source.path, StorageValidationErrorCode.NoSourcePath);
  assertValidationError(!!destination.path, StorageValidationErrorCode.NoDestinationPath);
  const { objectKey: sourcePath } = validateStorageOperationInput(source, identityId);
  const { objectKey: destinationPath } = validateStorageOperationInput(destination, identityId);
  const finalCopySource = `${sourceBucket}/${sourcePath}`;
  const finalCopyDestination = destinationPath;
  logger2.debug(`copying "${finalCopySource}" to "${finalCopyDestination}".`);
  await serviceCopy({
    source: finalCopySource,
    destination: finalCopyDestination,
    bucket: destBucket,
    s3Config
  });
  return { path: finalCopyDestination };
};
var copyWithKey = async (amplify, input) => {
  const { source, destination } = input;
  storageBucketAssertion(source.bucket, destination.bucket);
  assertValidationError(!!source.key, StorageValidationErrorCode.NoSourceKey);
  assertValidationError(!!destination.key, StorageValidationErrorCode.NoDestinationKey);
  const { bucket: sourceBucket, keyPrefix: sourceKeyPrefix } = await resolveS3ConfigAndInput(amplify, source);
  const { s3Config, bucket: destBucket, keyPrefix: destinationKeyPrefix } = await resolveS3ConfigAndInput(amplify, destination);
  const finalCopySource = `${sourceBucket}/${sourceKeyPrefix}${source.key}`;
  const finalCopyDestination = `${destinationKeyPrefix}${destination.key}`;
  logger2.debug(`copying "${finalCopySource}" to "${finalCopyDestination}".`);
  await serviceCopy({
    source: finalCopySource,
    destination: finalCopyDestination,
    bucket: destBucket,
    s3Config
  });
  return {
    key: destination.key
  };
};
var serviceCopy = async ({ source, destination, bucket, s3Config }) => {
  await copyObject({
    ...s3Config,
    userAgentValue: getStorageUserAgentValue(StorageAction.Copy)
  }, {
    Bucket: bucket,
    CopySource: source,
    Key: destination,
    MetadataDirective: "COPY"
    // Copies over metadata like contentType as well
  });
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/copy.mjs
function copy2(input) {
  return copy(Amplify, input);
}

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/internal/getUrl.mjs
var import_fast_xml_parser21 = __toESM(require_fast_xml_parser(), 1);
var import_buffer21 = __toESM(require_buffer(), 1);
var getUrl = async (amplify, input) => {
  const { options: getUrlOptions } = input;
  const { s3Config, keyPrefix, bucket, identityId } = await resolveS3ConfigAndInput(amplify, getUrlOptions);
  const { inputType, objectKey } = validateStorageOperationInput(input, identityId);
  const finalKey = inputType === STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
  if (getUrlOptions == null ? void 0 : getUrlOptions.validateObjectExistence) {
    await getProperties(amplify, input, StorageAction.GetUrl);
  }
  let urlExpirationInSec = (getUrlOptions == null ? void 0 : getUrlOptions.expiresIn) ?? DEFAULT_PRESIGN_EXPIRATION;
  const resolvedCredential = typeof s3Config.credentials === "function" ? await s3Config.credentials() : s3Config.credentials;
  const awsCredExpiration = resolvedCredential.expiration;
  if (awsCredExpiration) {
    const awsCredExpirationInSec = Math.floor((awsCredExpiration.getTime() - Date.now()) / 1e3);
    urlExpirationInSec = Math.min(awsCredExpirationInSec, urlExpirationInSec);
  }
  const maxUrlExpirationInSec = MAX_URL_EXPIRATION / 1e3;
  assertValidationError(urlExpirationInSec <= maxUrlExpirationInSec, StorageValidationErrorCode.UrlExpirationMaxLimitExceed);
  return {
    url: await getPresignedGetObjectUrl({
      ...s3Config,
      credentials: resolvedCredential,
      expiration: urlExpirationInSec
    }, {
      Bucket: bucket,
      Key: finalKey,
      ...(getUrlOptions == null ? void 0 : getUrlOptions.contentDisposition) && {
        ResponseContentDisposition: constructContentDisposition(getUrlOptions.contentDisposition)
      },
      ...(getUrlOptions == null ? void 0 : getUrlOptions.contentType) && {
        ResponseContentType: getUrlOptions.contentType
      }
    }),
    expiresAt: new Date(Date.now() + urlExpirationInSec * 1e3)
  };
};

// node_modules/@aws-amplify/storage/dist/esm/providers/s3/apis/getUrl.mjs
function getUrl2(input) {
  return getUrl(Amplify, input);
}

export {
  StorageError,
  isCancelError,
  uploadData,
  downloadData,
  remove2 as remove,
  list2 as list,
  getProperties2 as getProperties,
  copy2 as copy,
  getUrl2 as getUrl
};
//# sourceMappingURL=chunk-C7Q2ENK3.js.map
