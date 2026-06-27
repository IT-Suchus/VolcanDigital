"""AddUsuarioNombreEstadoCreatedAt

Revision ID: a1b2c3d4e5f6
Revises: e8bf45c613cd
Create Date: 2026-06-27 03:10:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = 'e8bf45c613cd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add nombre column (nullable so existing rows aren't broken)
    op.add_column('usuarios', sa.Column('nombre', sa.String(length=255), nullable=True))

    # Add estado column with default 'activo' so existing admin rows stay active
    op.add_column(
        'usuarios',
        sa.Column('estado', sa.String(length=50), nullable=False, server_default='activo')
    )

    # Add created_at column
    op.add_column(
        'usuarios',
        sa.Column(
            'created_at',
            sa.DateTime(timezone=True),
            server_default=sa.text('now()'),
            nullable=True
        )
    )


def downgrade() -> None:
    op.drop_column('usuarios', 'created_at')
    op.drop_column('usuarios', 'estado')
    op.drop_column('usuarios', 'nombre')
