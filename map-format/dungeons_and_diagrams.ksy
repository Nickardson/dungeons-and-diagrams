meta:
  id: dungeons_and_diagrams
  file-extension: tokyo.dat
  endian: le

seq:
  - id: map_count
    type: u4
  - id: maps
    type: map
    repeat: eos
    # repeat: expr
    # repeat-expr: 2

types:
  map:
    seq:
      - id: name_size
        type: u4
      - id: name
        type: str
        encoding: ASCII
        size: name_size
      - id: grid
        size: 64
      - id: unknown_1
        type: u4
      - id: unknown_2
        type: u4
      - id: unknown_3
        type: u4
      - id: unknown_4
        type: u4
