import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.WARNING)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.WARNING)
formatter = logging.Formatter(
    "%(asctime)s:%(levelname)s:%(message)s -- %(filename)s:%(funcname)s")
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)
