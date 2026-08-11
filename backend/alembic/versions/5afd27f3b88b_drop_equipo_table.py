"""DropEquipoTable

Revision ID: 5afd27f3b88b
Revises: c3d4e5f6a7b8
Create Date: 2026-08-11 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5afd27f3b88b'
down_revision: Union[str, None] = 'c3d4e5f6a7b8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_index(op.f('ix_equipo_id'), table_name='equipo')
    op.drop_table('equipo')


def downgrade() -> None:
    op.create_table(
        'equipo',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('nombre', sa.String(length=255), nullable=False),
        sa.Column('rol', sa.String(length=255), nullable=False),
        sa.Column('orden', sa.Integer(), nullable=True),
        sa.Column('imagen_data', sa.LargeBinary(), nullable=True),
        sa.Column('imagen_tipo', sa.String(length=40), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_equipo_id'), 'equipo', ['id'], unique=False)
