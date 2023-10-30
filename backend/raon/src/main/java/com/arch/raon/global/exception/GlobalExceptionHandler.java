package com.arch.raon.global.exception;

import com.arch.raon.global.dto.ErrorResponseDTO;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import static com.arch.raon.global.exception.ErrorCode.*;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Slf4j
@RestControllerAdvice
@Getter
public class GlobalExceptionHandler {

    // CustomException을 상속받은 모든 에러를 처리하는 Handler
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(CustomException e) {
        ErrorCode errorCode = e.getErrorCode();
        e.printStackTrace();
        return ResponseEntity.status(errorCode.getStatus())
                .body(ErrorResponseDTO.of(errorCode));
    }

    // CustomException을 상속받지 않은 에러를 처리하는 Handler들 작성
    // @Valid 예외 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleMethodArgumentNotValidException(BindException e) {
        log.error("[EXCEPTION] {}", e.getClass().getSimpleName());
        e.printStackTrace();
        return ResponseEntity.status(BAD_REQUEST)
                .body(new ErrorResponseDTO(INVALID_INPUT_VALUE.getCode(), e.getFieldError().getDefaultMessage()));
    }

    // 요청 데이터 인자 부족
    @ExceptionHandler(MissingRequestValueException.class)
    public ResponseEntity<ErrorResponseDTO> handleMissingRequestValueException(MissingRequestValueException e) {
        log.error("[EXCEPTION] {}", e.getClass().getSimpleName());
        e.printStackTrace();
        return ResponseEntity.status(BAD_REQUEST)
                .body(ErrorResponseDTO.of(MISSING_INPUT_VALUE));
    }

    // PathVariable 타입이 MissMatch
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponseDTO> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e){
        log.error("[EXCEPTION] {}", e.getClass().getSimpleName());
        e.printStackTrace();
        return ResponseEntity.status(BAD_REQUEST)
                .body(ErrorResponseDTO.of(INVALID_PATH_VALUE));
    }

    // 잘못된 HttpMethod로 요청
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponseDTO> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("[EXCEPTION] {}", e.getClass().getSimpleName());
        e.printStackTrace();
        return ResponseEntity.status(BAD_REQUEST)
                .body(ErrorResponseDTO.of(METHOD_NOT_ALLOWED));
    }

    // 없는 api로 요청
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNoHandlerFoundException(NoHandlerFoundException e) {
        log.error("[EXCEPTION] {}", e.getClass().getSimpleName());
        e.printStackTrace();
        return ResponseEntity.status(BAD_REQUEST)
                .body(ErrorResponseDTO.of(NO_SUCH_API));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleException(Exception e) {
        log.error("[EXCEPTION] {}", e.getClass().getSimpleName());
        e.printStackTrace();
        return ResponseEntity.status(INTERNAL_SERVER_ERROR)
                .body(ErrorResponseDTO.of(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}

