from typing import Any, Dict, Optional
from fastapi import HTTPException, status
from fastapi.requests import Request
from fastapi.responses import JSONResponse


class APIException(HTTPException):
    """General API exception as customized HTTP exception"""

    def __init__(self, status_code: int, detail: Any = None, headers: Dict[str, str] | None = None) -> None:
        super().__init__(status_code, detail, headers)


def api_exception_handler(request: Request, exc: APIException):
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={'message': exc.detail})
