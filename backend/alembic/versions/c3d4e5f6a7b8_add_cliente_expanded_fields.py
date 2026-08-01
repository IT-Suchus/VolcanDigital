"""add cliente expanded fields

Revision ID: c3d4e5f6a7b8
Revises: b2c3d4e5f6a1
Create Date: 2026-08-01 04:22:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c3d4e5f6a7b8'
down_revision: Union[str, None] = 'b2c3d4e5f6a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('clientes', sa.Column('descripcion', sa.Text(), nullable=True))
    op.add_column('clientes', sa.Column('como_llego', sa.Text(), nullable=True))
    op.add_column('clientes', sa.Column('como_mejoro', sa.Text(), nullable=True))
    op.add_column('clientes', sa.Column('stats', sa.JSON(), nullable=True))


def downgrade() -> None:
    op.drop_column('clientes', 'stats')
    op.drop_column('clientes', 'como_mejoro')
    op.drop_column('clientes', 'como_llego')
    op.drop_column('clientes', 'descripcion')
