# Author: Siddhant
# Edited at: 20/7/2019, 17:31


class Serializable:
    def json(self) -> dict:
        raise NotImplementedError
